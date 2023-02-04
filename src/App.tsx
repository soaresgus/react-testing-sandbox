import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Albums } from './components/Albums';
import { List } from './components/List';
import { Posts } from './components/Posts';
import { ListProvider } from './context/ListContext';

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ListProvider>
        <List initialItems={['Diego', 'Rodz', 'Mayk']} />
        <Posts />
        <Albums />
      </ListProvider>
    </QueryClientProvider>
  );
}
