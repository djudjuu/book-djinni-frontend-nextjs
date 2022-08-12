import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND;

const axiosInstance = () => {
  const defaultOptions = {
    baseURL: `${baseUrl}/api/v1`,
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Create instance
  let instance = axios.create(defaultOptions);

  return instance;
};

export default axiosInstance();

export const fetcher = (url) =>
  axiosInstance()
    .get(url)
    .then((res) => res.data);
