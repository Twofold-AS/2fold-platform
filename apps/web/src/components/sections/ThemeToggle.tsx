'use client';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';
  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="inline-flex items-center gap-2 text-sm px-3 py-1 border rounded-md"
      aria-label="Toggle dark mode"
    >
      {isDark ? <Sun size={14} /> : <Moon size={14} />}
      {isDark ? 'Light' : 'Dark'}
    </button>
  );
}
