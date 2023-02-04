import { Posts } from '../components/Posts';
import { render, screen, waitFor } from './test-utils';
import { faker } from '@faker-js/faker';
import axios, { AxiosError } from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Posts component', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should show loading when fetch is loading', async () => {
    const { getByText } = render(<Posts />);

    await waitFor(() => {
      expect(getByText(/loading/i)).toBeInTheDocument();
    });
  });

  it('should show posts when fetch is success', async () => {
    const fakeData = {
      userId: faker.datatype.number(),
      id: faker.datatype.number(),
      title: faker.name.jobArea(),
      body: faker.name.jobDescriptor(),
    };
    mockedAxios.get.mockResolvedValue({
      data: fakeData,
      status: 200,
      statusText: 'Ok',
      headers: {},
      config: {},
    });

    const { getByText } = render(<Posts />);

    await waitFor(() => {
      expect(getByText(fakeData.title)).toBeInTheDocument();
    });
  });

  it('should show error when fetch is failed', async () => {
    const fakeData = [
      {
        userId: faker.datatype.number(),
        id: faker.datatype.number(),
        title: faker.name.jobArea(),
        body: faker.name.jobDescriptor(),
      },
    ];

    mockedAxios.get.mockRejectedValueOnce(
      new AxiosError('Unauthorized', '401')
    );

    const { queryByText } = render(<Posts />);

    await waitFor(() => {
      expect(queryByText(/loading/i)).not.toBeInTheDocument();
      expect(queryByText(fakeData[0].title)).not.toBeInTheDocument();
    });
  });
});
