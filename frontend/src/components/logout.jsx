import { logout } from "../services/db";

const Logout = () => {
  console.log("logout");
  logout();
  window.location = "/";
};

export default Logout;
