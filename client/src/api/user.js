import axios from 'axios';
import { API_BASE_URL } from '../util/constant';

export const getUsers = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/user`, {
      withCredentials: true,
    });
    return res.data;
  } catch (e) {
    return null;
  }
};

export const createUser = async (user) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/user`, {
      ...user
    },{
      withCredentials: true,
    });
    return res.data;
  } catch (e) {
    return null;
  }
};

export const editUser = async (id, user) => {
  try {
    const res = await axios.put(`${API_BASE_URL}/user/${id}`, {
      ...user
    },{
      withCredentials: true,
    });
    return res.data;
  } catch (e) {
    return null;
  }
};

export const deleteUser = async (id, user) => {
  try {
    const res = await axios.delete(`${API_BASE_URL}/user/${id}`,{
      withCredentials: true,
    });
    return res.data;
  } catch (e) {
    return null;
  }
};
