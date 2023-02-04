import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

interface IPostData {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export function Posts() {
  const [posts, setPosts] = useState<IPostData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<AxiosError>();

  async function getPosts() {
    const request = await axios.get(
      'https://jsonplaceholder.typicode.com/posts/1'
    );

    return request.data as IPostData;
  }

  useEffect(() => {
    getPosts()
      .then((data) => {
        setPosts([data]);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error);
      });
  }, []);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  return (
    <>
      {error ? (
        <span>{error.message}</span>
      ) : (
        posts.map((post) => (
          <div key={post.id}>
            <h1>{post.title}</h1>
            <span>{post.body}</span>
          </div>
        ))
      )}
    </>
  );
}
