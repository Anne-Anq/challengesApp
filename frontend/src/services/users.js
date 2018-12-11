import axios from "axios";
import { apiUrl } from "../config.json";

const apiEndPoint = apiUrl + "/users";
const getUserData = async id => {
  const data = await axios.get(apiEndPoint + "/" + id);
  return data;
};

const quitChallenge = async id => {
  return await axios.put(`${apiEndPoint}/challenges/${id}`);
};

export { getUserData, quitChallenge };
