'use client';
import { useState, useEffect } from 'react';
import TwofoldLoader from './TwofoldLoader';

interface LoadingWrapperProps {
  children: React.ReactNode;
  showLoader?: boolean;
  showSkip?: boolean;
}

export default function LoadingWrapper({ 
  children, 
  showLoader = true, 
  showSkip = false 
}: LoadingWrapperProps) {
  const [isLoading, setIsLoading] = useState(showLoader);

  // Disable loading in development if needed
  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && !showLoader) {
      setIsLoading(false);
    }
  }, [showLoader]);

  if (isLoading) {
    return (
      <TwofoldLoader
        onDone={() => setIsLoading(false)}
        minTime={2500}
        showSkip={showSkip}
      />
    );
  }

  return <>{children}</>;
}