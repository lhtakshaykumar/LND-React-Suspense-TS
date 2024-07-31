import { useState, useEffect } from 'react';

function useDataFetcher<T>(url: string): T | null {
  const [data, setData] = useState<T | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');

  useEffect(() => {
    let isMounted = true;
    setStatus('loading');
    fetch(url)
      .then(response => response.json())
      .then(result => {
        if (isMounted) {
          setData(result);
          setStatus('idle');
        }
      })
      .catch(() => {
        if (isMounted) setStatus('error');
      });
    return () => {
      isMounted = false;
    };
  }, [url]);

  if (status === 'loading') {
    throw new Promise(() => {});
  }

  if (status === 'error') {
    throw new Error('Failed to fetch data');
  }

  return data;
}

export default useDataFetcher;
