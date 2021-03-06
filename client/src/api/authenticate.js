import axios from 'axios';

export const login = async (username, password) => {
  try {
    const res = await axios.post(
      "http://localhost:3001/api/v1/login",
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

export const getIdentity = async () => {
  try {
    const res = await axios.get("http://localhost:3001/api/v1/identity", {
      withCredentials: true,
    });
    return res.data;
  } catch (e) {
    console.log(e.response);
    return null;
  }
};
