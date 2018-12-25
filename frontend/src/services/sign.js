import axios from "axios";
import { tokenKey } from "../config.json";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const login = async data => {
  const { data: jwt } = await axios.post("/login", data);
  localStorage.setItem(tokenKey, jwt);
};
const logout = () => {
  localStorage.removeItem(tokenKey);
};
const register = async data => {
  const { data: jwt } = await axios.post("/register", data);
  localStorage.setItem(tokenKey, jwt);
};

export { login, logout, register };
