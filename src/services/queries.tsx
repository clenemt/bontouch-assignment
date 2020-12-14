import axios from 'axios';
import { QueryCache } from 'react-query';

const baseURL = 'https://jsonplaceholder.typicode.com';

export const fetchUser = async (id: string | number) => {
  const { data } = await axios.get(`${baseURL}/users/${id}`);
  return data;
};

export const fetchUsers = async () => {
  const { data } = await axios.get(`${baseURL}/users`);
  return data;
};

export const fetchUserAlbums = async (id: string | number) => {
  const { data } = await axios.get(`${baseURL}/albums?userId=${id}`);
  return data;
};

export const fetchAlbum = async (id: string | number) => {
  const { data } = await axios.get(`${baseURL}/albums/${id}`);
  return data;
};

export const fetchAlbumPhotos = async (id: string | number) => {
  const { data } = await axios.get(`${baseURL}/photos?albumId=${id}`);
  return data;
};

export const queryCache = new QueryCache({
  defaultConfig: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});
