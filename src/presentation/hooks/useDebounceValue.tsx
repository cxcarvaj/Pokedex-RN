import {useEffect, useState} from 'react';

export const useDebounceValue = (
  input: string = '',
  timeInMs: number = 500,
) => {
  const [debounceValue, setDebounceValue] = useState(input);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setDebounceValue(input);
    }, timeInMs);
    return () => {
      clearTimeout(timeOut);
    };
  }, [input, timeInMs]);

  return debounceValue;
};
