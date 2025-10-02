import axios from "axios";

export const createClient = (token) => {
  return axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
