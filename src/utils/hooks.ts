import { useEffect, useState } from 'react';

// Basic hook to avoid seeing the `Loading something...`
// if delay is under threshold
export const useDelayedRender = (delay: number) => {
  const [delayed, setDelayed] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => setDelayed(false), delay);
    return () => clearTimeout(timeout);
  }, [delay]);
  return (fn: () => any) => !delayed && fn();
};

// Basic hook to get/set from local storage
export const useLocalStorage = <T>(
  key: string,
  initialValue?: T
): [T, (value: T) => void] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
};

// Basic hook to listen to window resize
export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState([0, 0]);

  useEffect(() => {
    const handler = () =>
      setWindowSize([document.documentElement.clientWidth, window.innerHeight]);
    window.addEventListener('resize', handler);
    handler();
    return () => window.removeEventListener('resize', handler);
  }, []);

  return windowSize;
};
