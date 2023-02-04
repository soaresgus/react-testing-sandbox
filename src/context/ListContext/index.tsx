import { createContext, useState } from 'react';
import { IListContext, IListProvider } from './types';

export const ListContext = createContext({} as IListContext);

export function ListProvider({ children }: IListProvider) {
  const [items, setItems] = useState<string[]>([]);

  return (
    <ListContext.Provider value={{ items, setItems }}>
      {children}
    </ListContext.Provider>
  );
}
