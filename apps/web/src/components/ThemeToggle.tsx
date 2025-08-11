'use client';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setMounted(true);
    const root = document.documentElement;
    const initial =
      localStorage.getItem('theme') ??
      (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    if (initial === 'dark') root.classList.add('dark');
    setIsDark(root.classList.contains('dark'));
  }, []);

  if (!mounted) return null;

  const toggle = () => {
    const root = document.documentElement;
    const next = root.classList.toggle('dark');
    localStorage.setItem('theme', next ? 'dark' : 'light');
    setIsDark(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="inline-flex items-center rounded-xl border px-3 py-1 text-sm hover:bg-muted"
      aria-label="Toggle theme"
      data-testid="theme-toggle"
    >
      {isDark ? 'Light' : 'Dark'}
    </button>
  );
}
