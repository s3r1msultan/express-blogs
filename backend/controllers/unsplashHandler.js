import axios from 'axios';

export const fetchUnsplashImage = async () => {
  const response = await axios.get('https://api.unsplash.com/search/photos', {
    params: { query: 'blogging', per_page: 1 },
    headers: { Authorization: 'Client-ID bEibROmr-q53Dmt2204c88JIe86ZNgcFGJMOgkAGSHU' }
  });
  return response.data.results[0].urls.regular;
};