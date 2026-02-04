import axios from "axios";

const api = axios.create({
  baseURL: "https://dummyjson.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export async function fetchProducts(limit = 12) {
  const res = await api.get(`/products`, { params: { limit } });
  return res.data;
}

export default api;
