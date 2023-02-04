import * as ReactQuery from '@tanstack/react-query';
import * as React from 'react';
import userEvent from '@testing-library/user-event';
import { UseQueryResult } from '@tanstack/react-query';
import { faker } from '@faker-js/faker';
import axios, { AxiosResponse } from 'axios';

import { Albums } from '../components/Albums';
import { render, waitFor } from './test-utils';

const useQuerySpyOn = jest.spyOn(ReactQuery, 'useQuery');

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Albums Component', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should show loading when fetching is loading', async () => {
    useQuerySpyOn.mockImplementation(
      jest.fn().mockReturnValue({
        isLoading: true,
      } as UseQueryResult)
    );

    const { getByText } = render(<Albums />);

    await waitFor(() => {
      expect(getByText(/loading/i)).toBeInTheDocument;
    });
  });

  it('should show initial album', async () => {
    const data = {
      userId: 1,
      id: 1,
      title: faker.name.jobTitle(),
    };

    mockedAxios.get.mockResolvedValue({
      data,
      status: 200,
    });

    useQuerySpyOn.mockImplementation(
      jest.fn().mockReturnValue({
        isSuccess: true,
        isLoading: false,
        isError: false,
      } as UseQueryResult)
    );

    const { getByText, debug } = render(<Albums />);

    await waitFor(() => {
      expect(getByText(data.title)).toBeInTheDocument();
    });
  });

  it('should fetch next album when click in next album button', async () => {
    const previousData = {
      userId: 1,
      id: 1,
      title: faker.name.jobTitle(),
    };

    mockedAxios.get.mockResolvedValue({
      data: previousData,
      status: 200,
    });

    useQuerySpyOn.mockImplementation(
      jest.fn().mockReturnValue({
        isError: false,
        isSuccess: true,
        isLoading: false,
      } as UseQueryResult)
    );

    const { getByRole, getByText } = render(<Albums />);

    const nextAlbumButton = getByRole('button', { name: /próximo/i });

    const newData = {
      userId: 2,
      id: 2,
      title: faker.name.jobTitle(),
    };

    mockedAxios.get.mockResolvedValue({
      data: newData,
      status: 200,
    });

    await userEvent.click(nextAlbumButton);

    await waitFor(() => {
      expect(getByText(newData.title)).toBeInTheDocument();
    });
  });

  it('should fetch previous album when click in previous album button', async () => {
    const nextData = {
      userId: 2,
      id: 2,
      title: faker.name.jobTitle(),
    };

    mockedAxios.get.mockResolvedValue({
      data: nextData,
      status: 200,
    });

    useQuerySpyOn.mockImplementation(
      jest.fn().mockReturnValue({
        isError: false,
        isSuccess: true,
        isLoading: false,
      } as UseQueryResult)
    );

    const { getByRole, getByText, debug } = render(<Albums />);

    const nextAlbumButton = getByRole('button', { name: /próximo/i });
    const previousAlbumButton = getByRole('button', { name: /anterior/i });

    await userEvent.click(nextAlbumButton);

    const previousData = {
      userId: 1,
      id: 1,
      title: faker.name.jobTitle(),
    };

    mockedAxios.get.mockResolvedValue({
      data: previousData,
      status: 200,
    });

    await userEvent.click(previousAlbumButton);

    await waitFor(() => {
      expect(getByText(previousData.title)).toBeInTheDocument();
    });
  });

  it('should show error message when fetch is failed', () => {
    /* mockedAxios.get.mockRejectedValue({
      status: 500,
      statusText: 'Internal server error',
      headers: {},
      config: {},
    } as AxiosResponse); */

    const axiosSpy = jest.spyOn(axios, 'get');

    axiosSpy.mockRejectedValue(new Error('teste'));

    const { getByText, debug } = render(<Albums />);

    debug();
  });
});
