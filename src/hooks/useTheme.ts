import { useEffect, useState } from 'react';

function parseThemeValue(value: string | null) {
  return value === 'dark' ? 'dark' : value === 'light' ? 'light' : null;
}

export const useTheme = () => {
  const [theme, setTheme] = useState<'light' | 'dark' | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- set theme on mount
    setTheme(parseThemeValue(localStorage.getItem('theme')));
  }, []);

  const onThemeChange = (newTheme: 'light' | 'dark' | null) => {
    setTheme(newTheme);
    if (newTheme) {
      localStorage.setItem('theme', newTheme);
    } else {
      localStorage.removeItem('theme');
    }
    // Reload the page so layout can pick up the new theme from storage
    window.location.reload();
  };

  return [theme, onThemeChange] as const;
};
