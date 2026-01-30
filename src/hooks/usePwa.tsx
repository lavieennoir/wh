import { useEffect, useRef, useState } from 'react';

type BeforeInstallPromptEvent = Event & {
  prompt?: () => Promise<void>;
};

export const usePwa = () => {
  const installPromptRef = useRef<BeforeInstallPromptEvent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [canInstall, setCanInstall] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isPersistenceEnabled, setIsPersistenceEnabled] = useState(false);

  useEffect(() => {
    const handleChange = () => {
      setIsInstalled(window.matchMedia('(display-mode: standalone)').matches);
    };
    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      installPromptRef.current = event as BeforeInstallPromptEvent;
      setCanInstall(true);
    };

    handleChange();

    window.navigator?.storage?.persist().then((persisted) => {
      setIsPersistenceEnabled(persisted);
    });
    setTimeout(() => {
      // wait for handleBeforeInstallPrompt. We are not sure if it will be called, so just wait a bit.
      setIsLoading(false);
    }, 500);

    window.matchMedia('(display-mode: standalone)').addEventListener('change', handleChange);
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => {
      window.matchMedia('(display-mode: standalone)').removeEventListener('change', handleChange);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const onInstall = () => {
    installPromptRef.current?.prompt?.();
  };

  return {
    onInstall,
    canInstall,
    isInstalled,
    isLoading,
    isPersistenceEnabled,
  };
};
