import { useEffect, useCallback } from 'react';

export function useStepNav<T extends string>(
  steps: readonly T[],
  currentStep: T,
  setStep: (step: T) => void,
) {
  const currentIndex = steps.indexOf(currentStep);

  const goBack = useCallback(() => {
    if (currentIndex > 0) {
      setStep(steps[currentIndex - 1]);
    }
  }, [currentIndex, steps, setStep]);

  const goForward = useCallback(() => {
    if (currentIndex < steps.length - 1) {
      setStep(steps[currentIndex + 1]);
    }
  }, [currentIndex, steps, setStep]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't hijack arrows when user is typing in an input
      const tag = (e.target as HTMLElement).tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goBack();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        goForward();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goBack, goForward]);

  return {
    currentIndex,
    total: steps.length,
    canGoBack: currentIndex > 0,
    canGoForward: currentIndex < steps.length - 1,
    goBack,
    goForward,
  };
}
