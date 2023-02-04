import { useContext, useEffect } from 'react';
import { ListContext } from '.';

interface IUseListProps {
  initialItems?: string[];
}

export function useList({ initialItems }: IUseListProps) {
  const context = useContext(ListContext);

  useEffect(() => {
    if (initialItems) {
      context.setItems(initialItems);
    }
  }, []);

  return context;
}
