import { useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useState } from 'react';

interface IAlbumData {
  userId: number;
  id: number;
  title: string;
}

export function Albums() {
  const [albumId, setAlbumId] = useState<number>(1);

  const { isLoading, data, isError, error } = useQuery({
    queryKey: [`album-${albumId}`],
    queryFn: () => getAlbumById(albumId),
  });

  async function getAlbumById(id: number) {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/albums/${id}`
    );

    return response.data as IAlbumData;
  }

  function nextAlbum() {
    setAlbumId((state) => state + 1);
  }

  function previousAlbum() {
    setAlbumId((state) => (state > 1 ? state - 1 : 1));
  }

  if (isLoading) {
    return <span>Loading album...</span>;
  }

  if (isError) {
    return <span>{(error as AxiosError).message}</span>;
  }

  return (
    <div>
      <br />
      <br />
      <button onClick={previousAlbum} disabled={albumId <= 1}>
        Álbum anterior
      </button>
      <button onClick={nextAlbum}>Próximo Álbum</button>
      <h1>{data?.title}</h1>
    </div>
  );
}
