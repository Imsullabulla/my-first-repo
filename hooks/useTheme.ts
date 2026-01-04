'use client';

import { useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { THEME_KEY } from '@/lib/constants';

export type Theme = 'light' | 'dark';

export function useTheme() {
  const [theme, setTheme] = useLocalStorage<Theme>(THEME_KEY, 'dark');

  useEffect(() => {
    // Apply theme to document on mount and when theme changes
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return {
    theme,
    setTheme,
    toggleTheme,
  };
}
