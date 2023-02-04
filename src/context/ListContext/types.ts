interface IList {
  items: string[];
}

export interface IListContext extends IList {
  setItems(items: string[]): void;
}

export interface IListProvider {
  children: React.ReactNode;
}
