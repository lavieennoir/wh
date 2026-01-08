'use client';
import { useEffect, useState } from 'react';

declare global {
  interface Window {
    MSStream?: unknown;
  }
}

export default function InstallationPrompt() {
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(true);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsIOS(/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream);
    setIsStandalone(window.matchMedia('(display-mode: standalone)').matches);
  }, []);

  if (isStandalone) {
    return null; // Don't show install button if already installed
  }

  return (
    <div className="alert alert-info alert-outline mx-2">
      <div>
        <h2>Install App</h2>
        <button>Add to Home Screen</button>
        {isIOS && (
          <p>
            To install this app on your iOS device, tap the share button
            <span role="img" aria-label="share icon">
              {' '}
              ⎋{' '}
            </span>
            and then &ldquo;Add to Home Screen&ldquo;
            <span role="img" aria-label="plus icon">
              {' '}
              ➕{' '}
            </span>
            .
          </p>
        )}
      </div>
    </div>
  );
}
