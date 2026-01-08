'use client';

import { useEffect } from 'react';

export default function ServiceWorkerManager() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js', {
        scope: '/',
        updateViaCache: 'none',
      });
    }
  }, []);

  return null;
}
