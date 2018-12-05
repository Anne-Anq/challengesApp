import axios from "axios";
import jwt from "jsonwebtoken";
import { tokenKey } from "../config.json";

setJwt(getJwt());

const getUser = () => {
  const decoded = jwt.decode(getJwt());
  return decoded;
};

function setJwt(jwt) {
  axios.defaults.headers.common[tokenKey] = jwt;
}
function getJwt() {
  const jwt = localStorage.getItem(tokenKey);
  return jwt;
}
export { getUser };
