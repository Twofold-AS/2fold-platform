'use client';
import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface MobileMenuClientProps {
    hasSession: boolean;
    userName?: string | null;
}

export default function MobileMenuClient({ hasSession, userName }: MobileMenuClientProps) {
    const [isOpen, setIsOpen] = useState(false);

    // Close menu when clicking outside or on link
    useEffect(() => {
        if (isOpen) {
            const handleEscape = (e: KeyboardEvent) => {
                if (e.key === 'Escape') setIsOpen(false);
            };
            document.addEventListener('keydown', handleEscape);
            return () => document.removeEventListener('keydown', handleEscape);
        }
    }, [isOpen]);

    const closeMenu = () => setIsOpen(false);

    return (
        <>
            {/* Mobile menu button - only visible on mobile/tablet */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle menu"
                aria-expanded={isOpen}
            >
                {isOpen ? (
                    <X className="h-6 w-6" />
                ) : (
                    <Menu className="h-6 w-6" />
                )}
            </button>

            {/* Mobile menu overlay */}
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                        onClick={closeMenu}
                    />

                    {/* Mobile menu panel */}
                    <div className="fixed top-0 right-0 h-full w-72 bg-white dark:bg-gray-900 shadow-xl z-50 md:hidden transform transition-transform duration-300 ease-in-out">
                        <div className="flex flex-col h-full">
                            {/* Header with close button */}
                            <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
                                <span className="font-semibold text-lg">Menu</span>
                                <button
                                    onClick={closeMenu}
                                    className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                                    aria-label="Close menu"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            {/* Navigation links */}
                            <nav className="flex-1 px-4 py-6">
                                <div className="space-y-4">
                                    <Link
                                        href="/docs"
                                        className="block py-3 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                        onClick={closeMenu}
                                    >
                                        Docs
                                    </Link>
                                    <Link
                                        href="/api-docs"
                                        className="block py-3 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                        onClick={closeMenu}
                                    >
                                        API
                                    </Link>
                                    {hasSession && (
                                        <Link
                                            href="/dashboard"
                                            className="block py-3 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                            onClick={closeMenu}
                                        >
                                            Dashboard
                                        </Link>
                                    )}

                                    {/* Secondary links */}
                                    <div className="pt-4 border-t dark:border-gray-700 space-y-4">
                                        <Link
                                            href="/api-docs"
                                            className="block py-3 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                            onClick={closeMenu}
                                        >
                                            The Fold
                                        </Link>
                                        <Link
                                            href="/docs"
                                            className="block py-3 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                            onClick={closeMenu}
                                        >
                                            Priser
                                        </Link>
                                        <Link
                                            href="/api-docs"
                                            className="block py-3 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                            onClick={closeMenu}
                                        >
                                            Support
                                        </Link>
                                    </div>
                                </div>
                            </nav>

                            {/* Footer with theme toggle and auth */}
                            <div className="px-4 py-6 border-t dark:border-gray-700 space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600 dark:text-gray-400">Theme</span>
                                    <ThemeToggle />
                                </div>

                                {hasSession ? (
                                    <div className="space-y-3">
                                        <div className="text-sm text-gray-600 dark:text-gray-400">
                                            Innlogget som {userName ?? "bruker"}
                                        </div>
                                        <form action="/api/auth/signout" method="post" className="w-full">
                                            <button
                                                type="submit"
                                                className="w-full py-2 px-4 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-sm"
                                                onClick={closeMenu}
                                            >
                                                Logg ut
                                            </button>
                                        </form>
                                    </div>
                                ) : (
                                    <Link
                                        href="/auth/signin"
                                        className="block w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center text-sm"
                                        onClick={closeMenu}
                                    >
                                        Logg inn
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}