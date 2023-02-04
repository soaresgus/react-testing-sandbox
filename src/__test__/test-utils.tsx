import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, RenderOptions } from '@testing-library/react';
import { ListProvider } from '../context/ListContext';

const queryClient = new QueryClient();

export function AllWrappers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ListProvider>{children}</ListProvider>
    </QueryClientProvider>
  );
}

function customRender(ui: React.ReactElement, options?: RenderOptions) {
  return render(ui, { wrapper: AllWrappers, ...options });
}

export * from '@testing-library/react';

export { customRender as render };
