import axios from "axios";
import jwt from "jsonwebtoken";

const baseUrl = "http://localhost:3900/api";
const getChallenges = async () => {
  return await axios.get(baseUrl + "/challenges");
};
const deleteChallenge = async id => {
  return await axios.delete(baseUrl + "/challenges/" + id);
};

const login = async data => {
  const { data: jwt } = await axios.post(baseUrl + "/login", data);
  localStorage.setItem("token", jwt);
};
const logout = () => {
  localStorage.removeItem("token");
  console.log("storageclean");
};
const register = async data => {
  const { data: jwt } = await axios.post(baseUrl + "/register", data);
  localStorage.setItem("token", jwt);
};

const getUser = () => {
  const token = localStorage.getItem("token");
  const decoded = jwt.decode(token);
  return decoded;
};
export { getChallenges, login, logout, register, getUser, deleteChallenge };
