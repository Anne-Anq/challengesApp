import axios from "axios";
import { apiUrl, tokenKey } from "../config.json";

const login = async data => {
  const { data: jwt } = await axios.post(apiUrl + "/login", data);
  localStorage.setItem(tokenKey, jwt);
};
const logout = () => {
  localStorage.removeItem(tokenKey);
};
const register = async data => {
  const { data: jwt } = await axios.post(apiUrl + "/register", data);
  localStorage.setItem(tokenKey, jwt);
};

export { login, logout, register };
