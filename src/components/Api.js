// src/components/Api.js
import axios from 'axios';

export const API_URL = 'http://localhost:8080';
export const VIDEOS_ENDPOINT = '/videos';

export const fetchData = async (endpoint) => {
  try {
    const response = await axios.get(`${API_URL}${endpoint}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};