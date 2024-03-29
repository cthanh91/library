import axios from 'axios';
import { API_BASE_URL } from '../util/constant';

export const login = async (username, password) => {
  try {
    const res = await axios.post(
      `${API_BASE_URL}/login`,
      {
        username,
        password,
      },
      {
        withCredentials: true,
      }
    );
    return res.status === 200;
  } catch (e) {
    return false;
  }
};

export const logout = async () => {
  try {
    const res = await axios.post(`${API_BASE_URL}/logout`, {}, {
      withCredentials: true,
    });
    return res.status === 204;
  } catch (e) {
    return null;
  }
};

export const getIdentity = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/identity`, {
      withCredentials: true,
    });
    return res.data;
  } catch (e) {
    return null;
  }
};
