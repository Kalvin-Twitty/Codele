import { useState, useEffect } from 'react';

// Custom hook for syncing state with localStorage
function useLocalStorage(key, initialValue) {
  // Set state from localStorage or initial value
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialValue;
  });

  // Update localStorage on key or value change
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  // Return state and its setter function
  return [value, setValue];
}

// Export the custom hook
export default useLocalStorage;
