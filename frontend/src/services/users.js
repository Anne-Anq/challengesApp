import axios from "axios";
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const apiEndPoint = "/users";
const getUserData = async id => {
  const data = await axios.get(apiEndPoint + "/" + id);
  return data;
};

const quitChallenge = async id => {
  return await axios.put(`${apiEndPoint}/challenges/${id}`);
};

const logChallenge = async id => {
  return await axios.put(`${apiEndPoint}/challenges/log/${id}`);
};

export { getUserData, quitChallenge, logChallenge };
