// src/components/useApiKey.js
import { useState, useEffect } from 'react';
import { fetchApiKey as fetchApiKeyFromApi } from '../components/Api';

const useApiKey = () => {
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    const getApiKey = async () => {
      try {
        const key = await fetchApiKeyFromApi();
        setApiKey(key);
      } catch (error) {
        console.error('Error getting API key:', error);
      }
    };

    getApiKey();
  }, []);

  return apiKey;
};

export default useApiKey;
