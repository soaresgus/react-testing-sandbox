import {
  act,
  AllWrappers,
  render,
  renderHook,
  waitFor,
  waitForElementToBeRemoved,
} from './test-utils';
import userEvent from '@testing-library/user-event';
import { List } from '../components/List';
import { ListProvider } from '../context/ListContext';
import { useList } from '../context/ListContext/useList';
import { useCounter } from '../hooks/useCounter';

describe('List Component', () => {
  it('should render correctly', () => {
    const { container } = render(<List initialItems={['Julia']} />);

    expect(container).toMatchSnapshot();
  });

  it('should render list items', () => {
    const { getByText, queryByText, unmount } = render(
      <List initialItems={['Diego', 'Rodz', 'Mayk']} />,
      { wrapper: AllWrappers }
    );

    expect(getByText('Diego')).toBeInTheDocument();
    expect(getByText('Rodz')).toBeInTheDocument();
    expect(getByText('Mayk')).toBeInTheDocument();

    unmount();
    render(<List initialItems={['Julia']} />, { wrapper: ListProvider });
    expect(getByText('Julia')).toBeInTheDocument();
    expect(queryByText('Mayk')).not.toBeInTheDocument();
  });

  it('should be able to add new item to the list', async () => {
    const { getByText, getByPlaceholderText, getByLabelText, debug } = render(
      <List initialItems={[]} />
    );

    const inputElement = getByPlaceholderText('Novo item');
    const addButton = getByText('Adicionar');

    await userEvent.type(inputElement, 'Novo');
    await userEvent.click(addButton);

    await waitFor(() => {
      expect(getByText('Novo')).toBeInTheDocument();
    });
  });

  it('should be able to remove item from the list', async () => {
    const { getByText, getAllByText, debug } = render(
      <List initialItems={['Diego']} />
    );

    const removeButtons = getAllByText('Remover');

    await userEvent.click(removeButtons[0]);

    await waitForElementToBeRemoved(() => {
      return getByText('Diego');
    });
  });
});

describe('Counter Hook', () => {
  it('should increment count', () => {
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current.increment();
      result.current.increment();
      result.current.increment();
    });

    expect(result.current.count).toBe(3);
  });
});

describe('List Context', () => {
  it('shout set list items', () => {
    const { result } = renderHook(() => useList({ initialItems: ['Diego'] }), {
      wrapper: AllWrappers,
    });

    expect(result.current.items[0]).toBe('Diego');

    act(() => {
      result.current.setItems(['Marcelo']);
    });

    expect(result.current.items[0]).toBe('Marcelo');
  });
});
