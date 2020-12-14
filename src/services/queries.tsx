import axios from 'axios';
import { QueryCache } from 'react-query';

const baseURL = 'https://jsonplaceholder.typicode.com';

// Fetch a single user
export const fetchUser = async (id: string | number) => {
  const { data } = await axios.get(`${baseURL}/users/${id}`);
  return data;
};

// Fetch all users
export const fetchUsers = async () => {
  const { data } = await axios.get(`${baseURL}/users`);
  return data;
};

// Fetch albums of a single user
export const fetchUserAlbums = async (id: string | number) => {
  const { data } = await axios.get(`${baseURL}/albums?userId=${id}`);
  return data;
};

// Fetch a single album
export const fetchAlbum = async (id: string | number) => {
  const { data } = await axios.get(`${baseURL}/albums/${id}`);
  return data;
};

// Fetch photos of a single album
export const fetchAlbumPhotos = async (id: string | number) => {
  const { data } = await axios.get(`${baseURL}/photos?albumId=${id}`);
  return data;
};

// Avoid spamming jsonplaceholder
export const queryCache = new QueryCache({
  defaultConfig: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});
