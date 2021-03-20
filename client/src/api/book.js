import axios from 'axios';
import { API_BASE_URL } from '../util/constant';

export const getBooks = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/book`, {
      withCredentials: true,
    });
    return res.data;
  } catch (e) {
    return [];
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

export const deleteBook = async (id, book) => {
  try {
    const res = await axios.delete(`${API_BASE_URL}/book/${id}`,{
      withCredentials: true,
    });
    return res.data;
  } catch (e) {
    return null;
  }
};

export const searchBook = async (searchText) => {
  try {
    const res = await axios.get(`${API_BASE_URL}/book/search?text=${searchText}`,{
      withCredentials: true,
    });
    return res.data;
  } catch (e) {
    return [];
  }
};

export const borrowBook = async (id) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/book/${id}/borrow`, {}, {
      withCredentials: true,
    });
    return res.data;
  } catch (e) {
    return null;
  }
};
