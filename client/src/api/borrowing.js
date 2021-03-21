import axios from 'axios';
import { API_BASE_URL } from '../util/constant';

export const getBorrowingBooks = async (id) => {
  try {
    const res = await axios.get(`${API_BASE_URL}/borrowing`, {
      withCredentials: true,
    });
    return res.data;
  } catch (e) {
    return null;
  }
};

export const deleteBorrowing = async (id) => {
  try {
    const res = await axios.delete(`${API_BASE_URL}/borrowing/${id}`,{
      withCredentials: true,
    });
    return res.data;
  } catch (e) {
    return null;
  }
};

