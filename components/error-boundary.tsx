"use client";

import { Component, ReactNode } from "react";
import { AlertTriangle, RefreshCcw } from "lucide-react";

interface ErrorBoundaryProps {
    children: ReactNode;
    fallback?: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}

/**
 * Error Boundary component for graceful degradation
 * Catches React errors and shows a fallback UI instead of crashing the app
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
        };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return {
            hasError: true,
            error,
        };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        // Log error to console (could be sent to error tracking service)
        console.error('Error Boundary caught an error:', error, errorInfo);
    }

    handleReset = () => {
        this.setState({
            hasError: false,
            error: null,
        });
        // Optionally reload the page or reset state
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            // Use custom fallback if provided
            if (this.props.fallback) {
                return this.props.fallback;
            }

            // Default fallback UI
            return (
                <div className="min-h-screen flex items-center justify-center bg-nd-black p-4">
                    <div className="max-w-md w-full bg-nd-surface border border-nd-border-visible p-8 text-center">
                        <div className="flex justify-center mb-6">
                            <div className="p-4 bg-nd-accent/10 rounded-full">
                                <AlertTriangle className="w-8 h-8 text-nd-accent" />
                            </div>
                        </div>

                        <h2 className="text-2xl font-bold text-nd-text-display mb-4">
                            Something went wrong
                        </h2>

                        <p className="text-nd-text-secondary mb-6">
                            We encountered an unexpected error. This has been logged and we&apos;ll look into it.
                        </p>

                        {this.state.error && process.env.NODE_ENV === 'development' && (
                            <div className="mb-6 p-4 bg-nd-black/50 text-left">
                                <p className="text-xs font-mono text-nd-accent break-all">
                                    {this.state.error.message}
                                </p>
                            </div>
                        )}

                        <button
                            onClick={this.handleReset}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-nd-accent hover:opacity-80 text-nd-black font-bold nd-transition"
                        >
                            <RefreshCcw className="w-4 h-4" />
                            Reload Page
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

/**
 * Section-level Error Boundary with minimal fallback
 * Prevents one section from breaking the entire page
 */
export class SectionErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
        };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return {
            hasError: true,
            error,
        };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('Section Error Boundary caught an error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // Minimal fallback that doesn't break page layout
            return (
                <div className="py-16 px-4">
                    <div className="container mx-auto max-w-2xl">
                        <div className="bg-nd-surface border border-nd-accent/20 p-6 text-center">
                            <AlertTriangle className="w-6 h-6 text-nd-accent mx-auto mb-3" />
                            <p className="text-nd-text-secondary text-sm">
                                This section failed to load. Please try refreshing the page.
                            </p>
                            {this.state.error && process.env.NODE_ENV === 'development' && (
                                <p className="text-xs font-mono text-nd-accent mt-2">
                                    {this.state.error.message}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
