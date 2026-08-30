import { useEffect, useState } from 'react';

/**
 * Responsive desktop detection hook (min-width: 768px)
 * Seeded synchronously from mql.matches
 */
export function useIsDesktop(): boolean {
  const [isDesktop, setIsDesktop] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    return window.matchMedia('(min-width: 768px)').matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mql = window.matchMedia('(min-width: 768px)');
    const handler = (e: MediaQueryListEvent) => {
      setIsDesktop(e.matches);
    };

    // Ensure synchronous consistency
    setIsDesktop(mql.matches);

    mql.addEventListener('change', handler);
    return () => {
      mql.removeEventListener('change', handler);
    };
  }, []);

  return isDesktop;
}
