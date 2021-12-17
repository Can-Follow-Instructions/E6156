import axios from 'axios';

const POST_URL = process.env.POST_URL;

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
