import { useState } from 'react';
import { useList } from '../context/ListContext/useList';

interface IListProps {
  initialItems: string[];
}

export function List({ initialItems }: IListProps) {
  const [newItem, setNewItem] = useState('');

  const { items, setItems } = useList({ initialItems });

  function addToList() {
    setTimeout(() => {
      setItems([...items, newItem]);
    }, 500);
  }

  function removeFromList(item: string) {
    setTimeout(() => {
      setItems(items.filter((value) => value != item));
    }, 500);
  }

  return (
    <>
      <label htmlFor="new-item">Novo item</label>
      <input
        id="new-item"
        type="text"
        placeholder="Novo item"
        value={newItem}
        onChange={(event) => setNewItem(event.target.value)}
      />
      <button onClick={addToList}>Adicionar</button>
      <ul>
        {items.map((item) => (
          <li key={item} data-testid="list-item">
            {item}
            <button onClick={() => removeFromList(item)}>Remover</button>
          </li>
        ))}
      </ul>
    </>
  );
}
