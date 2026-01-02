"use client";

import { useEffect, useState, useRef } from "react";
import { ActivityCalendar } from "react-activity-calendar";
import { GitCommit, AlertCircle, RefreshCcw } from "lucide-react";
import { format } from "date-fns";
import { fetchWithRetry, fetchGitHub, type ApiError } from "@/lib/api";

export function Activity() {
    const [commits, setCommits] = useState<any[]>([]);
    const [calendarData2026, setCalendarData2026] = useState<any[]>([]);
    const [calendarData2025, setCalendarData2025] = useState<any[]>([]);

    // Quick Stats state
    const [repoCount, setRepoCount] = useState<number>(0);
    const [languages, setLanguages] = useState<{ name: string; percentage: number; color: string }[]>([]);
    const [currentStreak, setCurrentStreak] = useState<number>(0);
    const [yearlyCommits, setYearlyCommits] = useState<number>(0);
    const [statsLoaded, setStatsLoaded] = useState<boolean>(false);

    // Calendar responsive scaling
    const calendarContainerRef = useRef<HTMLDivElement>(null);
    const [calendarScale, setCalendarScale] = useState<number>(1);

    // Error states
    const [eventsError, setEventsError] = useState<ApiError | null>(null);
    const [contributionsError, setContributionsError] = useState<ApiError | null>(null);
    const [reposError, setReposError] = useState<ApiError | null>(null);

    // Language colors mapping
    const languageColors: Record<string, string> = {
        TypeScript: '#3178c6',
        JavaScript: '#f1e05a',
        Python: '#3572A5',
        Rust: '#dea584',
        'C#': '#178600',
        Java: '#b07219',
        Go: '#00ADD8',
        Ruby: '#701516',
        PHP: '#4F5D95',
        CSS: '#563d7c',
        HTML: '#e34c26',
    };

    // Calculate language breakdown from repos
    const calculateLanguages = (repos: any[]) => {
        const langCount: Record<string, number> = {};
        repos.forEach(repo => {
            if (repo.language) {
                langCount[repo.language] = (langCount[repo.language] || 0) + 1;
            }
        });

        const total = Object.values(langCount).reduce((a, b) => a + b, 0);
        if (total === 0) return [];

        return Object.entries(langCount)
            .map(([lang, count]) => ({
                name: lang,
                percentage: Math.round((count / total) * 100),
                color: languageColors[lang] || '#6e7681'
            }))
            .sort((a, b) => b.percentage - a.percentage)
            .slice(0, 5);
    };

    // Calculate current streak from contribution data
    const calculateStreak = (contributions: any[]) => {
        if (!contributions || contributions.length === 0) return 0;

        let streak = 0;
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Sort by date descending
        const sorted = [...contributions].sort((a, b) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        );

        for (const day of sorted) {
            const dayDate = new Date(day.date);
            dayDate.setHours(0, 0, 0, 0);

            const daysDiff = Math.floor((today.getTime() - dayDate.getTime()) / (1000 * 60 * 60 * 24));

            if (daysDiff === streak && day.count > 0) {
                streak++;
            } else if (daysDiff > streak) {
                break;
            }
        }

        return streak;
    };

    // Resize observer to scale calendar to fit container
    useEffect(() => {
        const updateScale = () => {
            if (calendarContainerRef.current) {
                const containerWidth = calendarContainerRef.current.offsetWidth;
                // Calendar native width is approximately 580px (53 weeks × 10px + padding)
                const calendarNativeWidth = 580;
                const scale = Math.min(containerWidth / calendarNativeWidth, 1);
                setCalendarScale(scale);
            }
        };

        updateScale();

        const resizeObserver = new ResizeObserver(updateScale);
        if (calendarContainerRef.current) {
            resizeObserver.observe(calendarContainerRef.current);
        }

        return () => resizeObserver.disconnect();
    }, [calendarData2026]);

    useEffect(() => {
        const fetchData = async () => {
            // Fetch recent events with retry and caching
            try {
                const data = await fetchGitHub<any[]>("/users/luinbytes/events/public", {
                    cacheTTL: 5 * 60 * 1000, // 5 minutes cache
                    onRetry: (attempt) => console.log(`Retrying events API (attempt ${attempt})`)
                });

                const pushEvents = data
                    .filter((event: any) => event.type === "PushEvent")
                    .slice(0, 5)
                    .map((event: any) => {
                        const commits = event.payload.commits || [];
                        const commitCount = commits.length;
                        const firstCommit = commits[0];
                        const commitMessage = firstCommit?.message?.split('\n')[0] || "Pushed updates"; // First line only
                        const commitUrl = firstCommit?.sha
                            ? `https://github.com/${event.repo.name}/commit/${firstCommit.sha}`
                            : `https://github.com/${event.repo.name}`;

                        return {
                            id: event.id,
                            repo: event.repo.name,
                            message: commitMessage,
                            commitCount,
                            commitUrl,
                            date: format(new Date(event.created_at), "MMM d, yyyy"),
                            type: "contribution"
                        };
                    });
                setCommits(pushEvents);
                setEventsError(null);
            } catch (err) {
                console.error("Failed to fetch events:", err);
                setEventsError(err as ApiError);
            }

            // Fetch contributions calendar for 2026 and 2025 with retry and caching
            try {
                const [data2026, data2025] = await Promise.all([
                    fetchWithRetry<any>(`https://github-contributions-api.jogruber.de/v4/luinbytes?y=2026`, {
                        cacheTTL: 15 * 60 * 1000,
                        onRetry: (attempt) => console.log(`Retrying 2026 contributions API (attempt ${attempt})`)
                    }),
                    fetchWithRetry<any>(`https://github-contributions-api.jogruber.de/v4/luinbytes?y=2025`, {
                        cacheTTL: 15 * 60 * 1000,
                        onRetry: (attempt) => console.log(`Retrying 2025 contributions API (attempt ${attempt})`)
                    })
                ]);

                if (data2026.contributions) {
                    const formatted = data2026.contributions.map((day: any) => ({
                        date: day.date,
                        count: day.count,
                        level: day.level
                    }));
                    setCalendarData2026(formatted);

                    // Calculate streak from 2026 data
                    const streak = calculateStreak(formatted);
                    setCurrentStreak(streak);

                    const thisYearContributions = formatted.reduce((sum: number, day: any) => sum + day.count, 0);
                    setYearlyCommits(thisYearContributions);
                }

                if (data2025.contributions) {
                    const formatted = data2025.contributions.map((day: any) => ({
                        date: day.date,
                        count: day.count,
                        level: day.level
                    }));
                    setCalendarData2025(formatted);
                }

                setContributionsError(null);
            } catch (err) {
                console.error("Failed to fetch contributions:", err);
                setContributionsError(err as ApiError);
            }

            // Fetch GitHub repos for language stats with retry and caching
            try {
                const repos = await fetchGitHub<any[]>("/users/luinbytes/repos?per_page=100", {
                    cacheTTL: 30 * 60 * 1000, // 30 minutes cache (repo data changes slowly)
                    onRetry: (attempt) => console.log(`Retrying repos API (attempt ${attempt})`)
                });

                if (Array.isArray(repos)) {
                    // Filter out forks
                    const ownRepos = repos.filter((repo: any) => !repo.fork);
                    setRepoCount(ownRepos.length);

                    // Calculate language breakdown
                    const langs = calculateLanguages(ownRepos);
                    setLanguages(langs);

                    setStatsLoaded(true);
                }
                setReposError(null);
            } catch (err) {
                console.error("Failed to fetch repos:", err);
                setReposError(err as ApiError);
                setStatsLoaded(true); // Show UI even if this fails
            }
        };

        fetchData();
    }, []);

    return (
        <section id="activity" className="py-24 relative border-t border-white/5">
            <div className="container px-4 mx-auto max-w-6xl grid lg:grid-cols-2 gap-20">

                {/* Left Column: Contributions & Graph */}
                <div>
                    <h2 className="text-3xl font-bold tracking-tighter mb-12 flex items-center gap-3">
                        Activity
                    </h2>

                    {/* 2026 Contributions */}
                    <div className="bg-surface border border-white/10 p-6 rounded-xl mb-4">
                        <div className="flex justify-between items-end mb-4">
                            <span className="text-sm text-gray-400 font-medium">2026</span>
                            <span className="text-xs text-gray-500 font-mono">
                                {calendarData2026.reduce((acc: number, curr: any) => acc + curr.count, 0)} contributions
                            </span>
                        </div>

                        {contributionsError ? (
                            <div className="h-[100px] flex flex-col items-center justify-center gap-3 text-center px-4">
                                <div className="flex items-center gap-2 text-red-400">
                                    <AlertCircle className="w-5 h-5" />
                                    <span className="font-medium">Failed to load contributions</span>
                                </div>
                                <button
                                    onClick={() => window.location.reload()}
                                    className="flex items-center gap-2 text-xs text-neon hover:underline mt-2"
                                >
                                    <RefreshCcw className="w-3 h-3" />
                                    Retry
                                </button>
                            </div>
                        ) : calendarData2026.length > 0 ? (
                            <div
                                ref={calendarContainerRef}
                                className="w-full overflow-x-auto custom-scrollbar"
                                style={{
                                    scrollbarWidth: 'thin',
                                    scrollbarColor: '#ff9eb5 #1a1a1a'
                                }}
                            >
                                <style jsx>{`
                                    .custom-scrollbar::-webkit-scrollbar {
                                        height: 6px;
                                    }
                                    .custom-scrollbar::-webkit-scrollbar-track {
                                        background: #1a1a1a;
                                        border-radius: 3px;
                                    }
                                    .custom-scrollbar::-webkit-scrollbar-thumb {
                                        background: linear-gradient(90deg, #794a63, #ff9eb5);
                                        border-radius: 3px;
                                    }
                                    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                                        background: linear-gradient(90deg, #b3688a, #ff9eb5);
                                    }
                                `}</style>
                                <ActivityCalendar
                                    data={calendarData2026}
                                    theme={{
                                        light: ['#1a1a1a', '#0e4429', '#006d32', '#26a641', '#39d353'],
                                        dark: ['#1a1a1a', '#3f2e3e', '#794a63', '#b3688a', '#ff9eb5'],
                                    }}
                                    labels={{
                                        totalCount: '{{count}} contributions in {{year}}',
                                    }}
                                    colorScheme="dark"
                                    blockSize={8}
                                    blockMargin={2}
                                    fontSize={10}
                                />
                            </div>
                        ) : (
                            <div className="h-[100px] flex items-center justify-center text-gray-500 text-sm animate-pulse">
                                Loading 2026 data...
                            </div>
                        )}
                    </div>

                    {/* 2025 Contributions */}
                    <div className="bg-surface border border-white/10 p-6 rounded-xl mb-8">
                        <div className="flex justify-between items-end mb-4">
                            <span className="text-sm text-gray-400 font-medium">2025</span>
                            <span className="text-xs text-gray-500 font-mono">
                                {calendarData2025.reduce((acc: number, curr: any) => acc + curr.count, 0)} contributions
                            </span>
                        </div>

                        {calendarData2025.length > 0 ? (
                            <div
                                className="w-full overflow-x-auto custom-scrollbar"
                                style={{
                                    scrollbarWidth: 'thin',
                                    scrollbarColor: '#ff9eb5 #1a1a1a'
                                }}
                            >
                                <ActivityCalendar
                                    data={calendarData2025}
                                    theme={{
                                        light: ['#1a1a1a', '#0e4429', '#006d32', '#26a641', '#39d353'],
                                        dark: ['#1a1a1a', '#3f2e3e', '#794a63', '#b3688a', '#ff9eb5'],
                                    }}
                                    labels={{
                                        totalCount: '{{count}} contributions in {{year}}',
                                    }}
                                    colorScheme="dark"
                                    blockSize={8}
                                    blockMargin={2}
                                    fontSize={10}
                                />
                            </div>
                        ) : (
                            <div className="h-[100px] flex items-center justify-center text-gray-500 text-sm animate-pulse">
                                Loading 2025 data...
                            </div>
                        )}
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-xl font-bold text-white mb-4">Recent Public Commits</h3>
                        {eventsError ? (
                            <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-6 text-center">
                                <div className="flex items-center justify-center gap-2 text-red-400 mb-3">
                                    <AlertCircle className="w-5 h-5" />
                                    <span className="font-medium">Failed to load recent commits</span>
                                </div>
                                <p className="text-xs text-gray-500 mb-4">
                                    {eventsError.isRateLimit
                                        ? "GitHub API rate limit reached. Using cached data if available."
                                        : eventsError.message}
                                </p>
                                <button
                                    onClick={() => window.location.reload()}
                                    className="flex items-center gap-2 text-xs text-neon hover:underline mx-auto"
                                >
                                    <RefreshCcw className="w-3 h-3" />
                                    Retry
                                </button>
                            </div>
                        ) : commits.length > 0 ? commits.map((item) => (
                            <a
                                key={item.id}
                                href={item.commitUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex gap-4 group cursor-pointer"
                            >
                                <div className="mt-1 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-neon/50 transition-colors shrink-0">
                                    <GitCommit className="w-4 h-4 text-neon" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <h4 className="text-white font-medium group-hover:text-neon transition-colors truncate">
                                        {item.message}
                                    </h4>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-sm text-gray-400 truncate">{item.repo.replace('luinbytes/', '')}</span>
                                        {item.commitCount > 1 && (
                                            <span className="text-[10px] bg-neon/10 text-neon px-1.5 py-0.5 rounded font-mono">
                                                +{item.commitCount - 1} more
                                            </span>
                                        )}
                                    </div>
                                    <span className="text-xs text-gray-500 font-mono mt-1 block">{item.date}</span>
                                </div>
                            </a>
                        )) : (
                            <div className="text-gray-500 text-sm italic py-4">
                                No recent public commits found. I might be working on private repos.
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column: Quick Dev Stats */}
                <div>
                    <h2 className="text-3xl font-bold tracking-tighter mb-12 flex items-center gap-3">
                        Quick Stats <span className="text-sm font-normal text-gray-500 font-mono self-end mb-1">/ live</span>
                    </h2>

                    {reposError ? (
                        <div className="bg-surface border border-white/10 rounded-xl p-8 h-[400px] flex flex-col items-center justify-center gap-4">
                            <div className="flex items-center gap-2 text-red-400">
                                <AlertCircle className="w-6 h-6" />
                                <span className="font-bold text-lg">Failed to load stats</span>
                            </div>
                            <p className="text-sm text-gray-500 text-center max-w-md">
                                {reposError.isRateLimit
                                    ? "GitHub API rate limit reached. Stats will refresh when the limit resets."
                                    : reposError.message}
                            </p>
                            <button
                                onClick={() => window.location.reload()}
                                className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm text-neon transition-colors"
                            >
                                <RefreshCcw className="w-4 h-4" />
                                Retry
                            </button>
                        </div>
                    ) : !statsLoaded ? (
                        <div className="bg-surface border border-white/10 rounded-xl p-8 h-[400px] flex items-center justify-center">
                            <div className="text-gray-500 text-sm animate-pulse">Loading GitHub stats...</div>
                        </div>
                    ) : (
                        <>
                            {/* Stats Cards Grid */}
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="bg-surface border border-white/10 rounded-xl p-6 hover:border-neon/30 transition-colors">
                                    <div className="text-4xl font-bold text-neon mb-2 font-mono">{repoCount}</div>
                                    <div className="text-sm text-gray-400 uppercase tracking-wide">Public Repos</div>
                                </div>
                                <div className="bg-surface border border-white/10 rounded-xl p-6 hover:border-neon/30 transition-colors">
                                    <div className="text-4xl font-bold text-neon mb-2 font-mono">{yearlyCommits}</div>
                                    <div className="text-sm text-gray-400 uppercase tracking-wide">This Year</div>
                                </div>
                            </div>

                            {/* Language Breakdown */}
                            <div className="bg-surface border border-white/10 rounded-xl p-6 mb-6">
                                <h3 className="text-lg font-bold text-white mb-4">Top Languages</h3>
                                <div className="space-y-3">
                                    {languages.map((lang, index) => (
                                        <div key={index}>
                                            <div className="flex justify-between items-center mb-1.5">
                                                <div className="flex items-center gap-2">
                                                    <div
                                                        className="w-3 h-3 rounded-full"
                                                        style={{ backgroundColor: lang.color }}
                                                    />
                                                    <span className="text-sm text-gray-300 font-medium">{lang.name}</span>
                                                </div>
                                                <span className="text-sm text-gray-500 font-mono">{lang.percentage}%</span>
                                            </div>
                                            <div className="h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
                                                <div
                                                    className="h-full rounded-full transition-all duration-500"
                                                    style={{
                                                        width: `${lang.percentage}%`,
                                                        backgroundColor: lang.color
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Streak Display */}
                            {currentStreak > 0 && (
                                <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-xl p-4 mb-6">
                                    <div className="flex items-center gap-3">
                                        <span className="text-3xl">🔥</span>
                                        <div>
                                            <div className="text-xl font-bold text-white font-mono">{currentStreak} day streak</div>
                                            <div className="text-xs text-gray-400">Keep the momentum going!</div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="p-6 border border-white/10 rounded-xl bg-gradient-to-br from-neon/5 to-purple-500/5">
                                <h3 className="font-bold text-white mb-2">Real-time data.</h3>
                                <p className="text-gray-400 text-sm mb-4">
                                    These stats are pulled live from the GitHub API.
                                </p>
                                <a href="https://github.com/luinbytes" target="_blank" className="text-neon hover:underline text-sm font-bold">
                                    Visit GitHub Profile &rarr;
                                </a>
                            </div>
                        </>
                    )}
                </div>

            </div>
        </section>
    );
}
