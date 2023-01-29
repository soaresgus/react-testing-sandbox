import { useState } from 'react';

export function App() {
  const [newItem, setNewItem] = useState('');
  const [list, setList] = useState(['Diego', 'Rodz', 'Mayk']);

  function addToList() {
    setTimeout(() => {
      setList((state) => [...state, newItem]);
    }, 500);
  }

  return (
    <>
      <input
        type="text"
        placeholder="Novo item"
        value={newItem}
        onChange={(event) => setNewItem(event.target.value)}
      />
      <button onClick={addToList}>Adicionar</button>
      <ul>
        {list.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </>
  );
}
