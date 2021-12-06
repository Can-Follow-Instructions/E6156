import axios from 'axios';

const POST_URL = 'http://localhost:3001/posts/'; // TODO hardcode

export const createPostAPI = async (data) => {
  const resp = await axios.post(POST_URL, data);
  return resp.data;
};

export const getPostsAPI = async () => {
  const resp = await axios.get(POST_URL);
  return resp.data;
};

export const getPostsByUserId = async (userId) => {
  const resp = await axios.get(`${POST_URL}?userId=${userId}`);
  return resp.data;
};
