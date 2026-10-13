import { useState, useEffect, useRef } from 'react';

/**
 * Generic hook for managing localStorage state
 */
export function useLocalStorage<T>(
  key: string,
  defaultValue: T,
  serializer?: {
    serialize: (value: T) => string;
    deserialize: (value: string) => T;
  }
) {
  const serialize = serializer?.serialize || JSON.stringify;
  const deserialize = serializer?.deserialize || JSON.parse;

  // Callers frequently pass an inline serializer object, so these functions get
  // a new identity every render. Hold them in refs so the cross-tab sync effect
  // below can depend on `key` alone instead of re-subscribing on every render.
  const deserializeRef = useRef(deserialize);
  deserializeRef.current = deserialize;

  const [state, setState] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? deserializeRef.current(item) : defaultValue;
    } catch (error) {
      console.warn(`Failed to load ${key} from localStorage:`, error);
      return defaultValue;
    }
  });

  const setValue = (value: T | ((prev: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(state) : value;
      setState(valueToStore);
      localStorage.setItem(key, serialize(valueToStore));
    } catch (error) {
      console.warn(`Failed to save ${key} to localStorage:`, error);
    }
  };

  // Sync with localStorage changes from other tabs
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setState(deserializeRef.current(e.newValue));
        } catch (error) {
          console.warn(`Failed to sync ${key} from localStorage:`, error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key]);

  return [state, setValue] as const;
}