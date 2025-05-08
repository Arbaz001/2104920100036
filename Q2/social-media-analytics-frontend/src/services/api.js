import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000'; // Replace with your backend URL

export const getTopUsers = async () => {
  const response = await axios.get(`${API_BASE_URL}/api/users/top`);
  return response.data;
};

export const getTrendingPosts = async () => {
  const response = await axios.get(`${API_BASE_URL}/api/posts/trending`);
  return response.data;
};

export const getFeed = async () => {
  const response = await axios.get(`${API_BASE_URL}/api/posts/feed`);
  return response.data;
};

// Helper function to generate random images
export const randomImage = (type) => {
  const seed = Math.floor(Math.random() * 1000);
  return type === 'user'
    ? `https://i.pravatar.cc/150?img=${seed}`
    : `https://picsum.photos/600/400?random=${seed}`;
};