import axios from 'axios';
import { API_BASE_URL } from '../util/constant';

export const getBooks = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/book`, {
      withCredentials: true,
    });
    return res.data;
  } catch (e) {
    return null;
  }
};

export const createBook = async (book) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/book`, {
      ...book
    },{
      withCredentials: true,
    });
    return res.data;
  } catch (e) {
    return null;
  }
};

export const editBook = async (id, book) => {
  try {
    const res = await axios.put(`${API_BASE_URL}/book/${id}`, {
      ...book
    },{
      withCredentials: true,
    });
    return res.data;
  } catch (e) {
    return null;
  }
};
