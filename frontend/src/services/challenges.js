import axios from "axios";
import { apiUrl } from "../config.json";

const apiEndPoint = apiUrl + "/challenges";

const getChallenges = async () => {
  return await axios.get(apiEndPoint);
};
const deleteChallenge = async id => {
  return await axios.delete(`${apiEndPoint}/${id}`);
};
const postChallenge = async data => {
  return await axios.post(apiEndPoint, data);
};

export { getChallenges, postChallenge, deleteChallenge };
