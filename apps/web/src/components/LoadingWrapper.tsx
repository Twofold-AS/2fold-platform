'use client';
import { useState, useEffect } from 'react';
import TwofoldLoader from './TwofoldLoader';

interface LoadingWrapperProps {
  children: React.ReactNode;
  showLoader?: boolean;
}

export default function LoadingWrapper({ children, showLoader = true }: LoadingWrapperProps) {
  const [isLoading, setIsLoading] = useState(showLoader);

  // Hvis du vil disable loading i development
  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && !showLoader) {
      setIsLoading(false);
    }
  }, [showLoader]);

  if (isLoading) {
    return (
      <TwofoldLoader
        onDone={() => setIsLoading(false)}
        minTime={2500} // 2.5 sekunder
      />
    );
  }

  return <>{children}</>;
}