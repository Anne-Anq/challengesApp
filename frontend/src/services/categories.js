import axios from "axios";
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const apiEndPoint = "/categories";

const getCategories = async () => {
  return await axios.get(apiEndPoint);
};

const addCategory = async data => {
  return await axios.post(apiEndPoint, data);
};

const deleteCategory = async id => {
  return await axios.delete(`${apiEndPoint}/${id}`);
};

export { getCategories, addCategory, deleteCategory };
