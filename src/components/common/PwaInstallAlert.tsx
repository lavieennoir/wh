'use client';
import { usePwa } from '@/src/hooks/usePwa';
import clsx from 'clsx';
import EnterAnimation, { EnterAnimationProps } from './animation/EnterAnimation';

export function PwaInstallAlert({ className, ...props }: Omit<EnterAnimationProps, 'role'>) {
  const { canInstall, onInstall, isInstalled, isLoading, isPersistenceEnabled } = usePwa();

  if (isLoading) return null;

  if (!isInstalled) {
    return (
      <EnterAnimation
        role="alert"
        {...props}
        className={clsx('alert alert-info alert-outline flex flex-col md:flex-row', className)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="stroke-info h-6 w-6 shrink-0"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        {canInstall ? (
          <>
            <span>Install the app to make sure you have access to all features.</span>
            <button onClick={onInstall} className="btn btn-info w-full md:w-auto md:ml-auto">
              Install
            </button>
          </>
        ) : (
          <span>Install the app by adding it to your home screen.</span>
        )}
      </EnterAnimation>
    );
  }

  // App is installed but persistence is not enabled
  if (!isPersistenceEnabled) {
    return (
      <EnterAnimation
        role="alert"
        className="alert alert-warning alert-outline flex flex-col md:flex-row"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <span>
          We are not able to ensure data persistence on this device. Please enable persistence in
          your browser settings or reinstall the app.
        </span>
      </EnterAnimation>
    );
  }

  return null;
}
