import { useEffect, useState } from 'react';
import * as ThemeLoader from '../components/ThemeLoader';

export const useTheme = () => {
  const [theme, setTheme] = useState<'light' | 'dark' | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- set theme on mount
    setTheme(ThemeLoader.getTheme());
  }, []);

  const onThemeChange = (newTheme: 'light' | 'dark' | null) => {
    setTheme(newTheme);
    if (newTheme) {
      ThemeLoader.setTheme(newTheme);
    } else {
      ThemeLoader.clearTheme();
    }
  };

  return [theme, onThemeChange] as const;
};
