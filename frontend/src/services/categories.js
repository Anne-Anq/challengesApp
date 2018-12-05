import axios from "axios";
import { apiUrl } from "../config.json";

const apiEndPoint = apiUrl + "/categories";

const getCategories = async () => {
  return await axios.get(apiEndPoint);
};

export { getCategories };
