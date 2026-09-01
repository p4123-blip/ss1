import { useEffect } from 'react';

interface ScrollToTopProps {
  path: string;
}

export default function ScrollToTop({ path }: ScrollToTopProps) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [path]);

  return null;
}
