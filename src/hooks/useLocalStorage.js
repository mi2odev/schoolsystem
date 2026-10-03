import { useEffect, useState } from 'react';

// Like useState, but the value is saved in the browser so it survives a page reload.
const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Storage may be full or blocked; keep working in memory.
    }
  }, [key, value]);

  return [value, setValue];
};

// Returns an ID that is never reused, even after items are deleted.
export const nextId = (items, idKey) =>
  items.reduce((max, item) => Math.max(max, Number(item[idKey]) || 0), 0) + 1;

export default useLocalStorage;
