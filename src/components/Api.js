// src/components/Api.js
import axios from 'axios';

export const API_URL = 'https://unit-3-project-api-0a5620414506.herokuapp.com';
export const REGISTER_ENDPOINT = '/register';
export const VIDEOS_ENDPOINT = '/videos';

export const fetchApiKey = async () => {
  const storedApiKey = localStorage.getItem('api_key');
  if (storedApiKey) {
    return storedApiKey;
  }

  try {
    const response = await axios.get(`${API_URL}${REGISTER_ENDPOINT}`);
    const apiKey = response.data.api_key;
    localStorage.setItem('api_key', apiKey);
    return apiKey;
  } catch (error) {
    console.error('Error fetching API key:', error);
    throw error;
  }
};