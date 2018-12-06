import axios from "axios";
import { apiUrl } from "../config.json";

const apiEndPoint = apiUrl + "/challenges";

const getChallenges = async () => {
  return await axios.get(apiEndPoint);
};

const getChallenge = async id => {
  return await axios.get(`${apiEndPoint}/${id}`);
};

const deleteChallenge = async id => {
  return await axios.delete(`${apiEndPoint}/${id}`);
};
const postChallenge = async data => {
  return await axios.post(apiEndPoint, data);
};

const quitChallenge = async (userId, challengeId) => {
  console.log(`${userId}quitChalleng${challengeId}`);
};

const takeChallenge = async (userId, challengeId) => {
  console.log(`${userId}take Challeng${challengeId}`);
};
export {
  getChallenges,
  getChallenge,
  postChallenge,
  deleteChallenge,
  takeChallenge,
  quitChallenge
};
