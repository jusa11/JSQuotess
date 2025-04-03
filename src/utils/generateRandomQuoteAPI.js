import axios from 'axios';
import { URL, RANDOM_QUOTE } from '../config';

export const generateRandomQuoteAPI = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(`${URL}${RANDOM_QUOTE}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data;
};
