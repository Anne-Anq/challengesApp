import axios from "axios";
import { apiUrl } from "../config.json";

const apiEndPoint = apiUrl + "/categories";

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
