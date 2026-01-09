'use client';

import { useEffect } from 'react';

export const getTheme = () => {
  const value = localStorage.getItem('theme');
  return value === 'dark' ? 'dark' : value === 'light' ? 'light' : null;
};

/**
 * Set the theme in localStorage and the data-theme attribute on the document element.
 * @param theme - The theme to set.
 */
export const setTheme = (theme: 'light' | 'dark') => {
  localStorage.setItem('theme', theme);
  document.documentElement.setAttribute('data-theme', theme);
};

/**
 * Remove the theme from localStorage and the data-theme attribute on the document element.
 */
export const clearTheme = () => {
  localStorage.removeItem('theme');
  document.documentElement.removeAttribute('data-theme');
};

/**
 * Load the theme from localStorage and set the data-theme attribute on the document element on application mount.
 */
export default function ThemeLoader() {
  useEffect(() => {
    const theme = getTheme();
    if (theme) {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }, []);

  return null;
}
