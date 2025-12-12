"use client";

import { useEffect, useState } from "react";
import { ActivityCalendar } from "react-activity-calendar";
import { GitCommit, Package, Zap } from "lucide-react";
import { format } from "date-fns";

export function Activity() {
    const [commits, setCommits] = useState<any[]>([]);
    const [calendarData, setCalendarData] = useState<any[]>([]);

    // Quick Stats state
    const [repoCount, setRepoCount] = useState<number>(0);
    const [languages, setLanguages] = useState<{ name: string; percentage: number; color: string }[]>([]);
    const [currentStreak, setCurrentStreak] = useState<number>(0);
    const [yearlyCommits, setYearlyCommits] = useState<number>(0);
    const [statsLoaded, setStatsLoaded] = useState<boolean>(false);

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

    useEffect(() => {
        // Fetch recent events
        fetch("https://api.github.com/users/luinbytes/events/public")
            .then(res => res.json())
            .then(data => {
                const pushEvents = data
                    .filter((event: any) => event.type === "PushEvent")
                    .slice(0, 5)
                    .map((event: any) => ({
                        id: event.id,
                        repo: event.repo.name,
                        message: event.payload.commits?.[0]?.message || "Pushed updates",
                        date: format(new Date(event.created_at), "MMM d, yyyy"),
                        type: "contribution"
                    }));
                setCommits(pushEvents);
            })
            .catch(err => console.error("Failed to fetch events", err));

        // Fetch contributions (mocking structure for calendar as real API needs auth/proxy)
        // In a real production app we would use a proxy or specific graphQL query
        // For now, we simulate the "structure" but can't easily get the numbers without a token on client
        // So we will fallback to a visual approximation or specific known activity if possible.
        // However, user specifically asked for "actual github graph". 
        // Best public way without token is using a service or scraping. 
        // Let's use a public API wrapper for contributions if available or just the recent event stream to populate "today"

        // Attempting to fetch from a public contribution API (e.g. github-contributions-api.jogruber.de)
        fetch("https://github-contributions-api.jogruber.de/v4/luinbytes?y=last")
            .then(res => res.json())
            .then(data => {
                if (data.contributions) {
                    const formatted = data.contributions.map((day: any) => ({
                        date: day.date,
                        count: day.count,
                        level: day.level
                    }));
                    setCalendarData(formatted);

                    // Calculate streak and yearly commits from contribution data
                    const streak = calculateStreak(formatted);
                    setCurrentStreak(streak);

                    const currentYear = new Date().getFullYear();
                    const thisYearContributions = formatted
                        .filter((day: any) => new Date(day.date).getFullYear() === currentYear)
                        .reduce((sum: number, day: any) => sum + day.count, 0);
                    setYearlyCommits(thisYearContributions);
                }
            })
            .catch(err => console.error("Failed to fetch calendar", err));

        // Fetch GitHub repos for language stats
        fetch("https://api.github.com/users/luinbytes/repos?per_page=100")
            .then(res => res.json())
            .then(repos => {
                if (Array.isArray(repos)) {
                    // Filter out forks
                    const ownRepos = repos.filter((repo: any) => !repo.fork);
                    setRepoCount(ownRepos.length);

                    // Calculate language breakdown
                    const langs = calculateLanguages(ownRepos);
                    setLanguages(langs);

                    setStatsLoaded(true);
                }
            })
            .catch(err => {
                console.error("Failed to fetch repos", err);
                setStatsLoaded(true);
            });

    }, []);

    return (
        <section id="activity" className="py-32 relative">
            <div className="container px-4 mx-auto grid lg:grid-cols-2 gap-16">

                {/* Left Column: Contributions & Graph */}
                <div>
                    <h2 className="text-3xl font-bold tracking-tighter mb-8 flex items-center gap-3">
                        Activity
                    </h2>

                    <div className="bg-surface border border-white/10 p-6 rounded-xl mb-8">
                        <div className="flex justify-between items-end mb-4">
                            <span className="text-sm text-gray-400">Contributions (Last Year)</span>
                            <span className="text-xs text-gray-500 font-mono">
                                {calendarData.reduce((acc, curr) => acc + curr.count, 0)} Total
                            </span>
                        </div>

                        {calendarData.length > 0 ? (
                            <div className="w-full flex justify-center overflow-hidden">
                                <ActivityCalendar
                                    data={calendarData}
                                    theme={{
                                        light: ['#1a1a1a', '#0e4429', '#006d32', '#26a641', '#39d353'],
                                        dark: ['#1a1a1a', '#3f2e3e', '#794a63', '#b3688a', '#ff9eb5'], // Pastel Pink Palette
                                    }}
                                    labels={{
                                        totalCount: '{{count}} contributions in {{year}}',
                                    }}
                                    colorScheme="dark"
                                    blockSize={9}
                                    blockMargin={3}
                                    fontSize={12}
                                    style={{ width: '100%', height: 'auto', maxWidth: '100%' }}
                                />
                            </div>
                        ) : (
                            <div className="h-[120px] flex items-center justify-center text-gray-500 text-sm animate-pulse">
                                Loading GitHub Data...
                            </div>
                        )}
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-xl font-bold text-white mb-4">Recent Public Commits</h3>
                        {commits.length > 0 ? commits.map((item) => (
                            <div key={item.id} className="flex gap-4 group">
                                <div className="mt-1 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-neon/50 transition-colors shrink-0">
                                    <GitCommit className="w-4 h-4 text-neon" />
                                </div>
                                <div className="min-w-0">
                                    <h4 className="text-white font-medium group-hover:text-neon transition-colors truncate w-full">
                                        {item.repo}
                                    </h4>
                                    <p className="text-sm text-gray-400 truncate w-full max-w-[300px]">{item.message}</p>
                                    <span className="text-xs text-gray-500 font-mono mt-1 block">{item.date}</span>
                                </div>
                            </div>
                        )) : (
                            <div className="text-gray-500 text-sm italic py-4">
                                No recent public commits found. I might be working on private repos.
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column: Quick Dev Stats */}
                <div>
                    <h2 className="text-3xl font-bold tracking-tighter mb-8 flex items-center gap-3">
                        Quick Stats <span className="text-sm font-normal text-gray-500 font-mono self-end mb-1">/ live</span>
                    </h2>

                    {!statsLoaded ? (
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
