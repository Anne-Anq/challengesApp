import { logout } from "../services/user";

const Logout = () => {
  console.log("logout");
  logout();
  window.location = "/";
};

export default Logout;
