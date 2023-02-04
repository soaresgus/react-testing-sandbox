import { useState } from 'react';

export function useCounter() {
  const [count, setCount] = useState<number>(0);

  function increment() {
    setCount((state) => state + 1);
  }

  return { count, increment };
}
