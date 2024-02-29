import axios from "axios";
export const fetchPexelsImage = async () => {
  const response = await axios.get('https://api.pexels.com/v1/search', {
    params: { query: 'blogging', per_page: 1 },
    headers: { Authorization: 'Bearer Q1eeMZYphO96MmNy6rFlo96J1a6CQZOr2GINTxKCBANs6AaZIlnjN31d' }
  });
  return response.data.photos[0].src.medium;
};
