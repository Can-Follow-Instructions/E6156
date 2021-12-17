import axios from 'axios';

const DISCUSSION_URL = process.env.DISCUSSION_URL;

export const getDiscussionAPI = async () => {
  const resp = await axios.get(DISCUSSION_URL);
  return resp.data;
};

export const createDiscussionAPI = async (data: any) => {
  const resp = await axios.post(DISCUSSION_URL, data);
  return resp.data;
};

export const getDiscussionForPostAPI = async (postId: string) => {
  const resp = await axios.get(`${DISCUSSION_URL}post/${postId}`);
  return resp.data;
};
