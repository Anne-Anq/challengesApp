import { logout } from "../services/sign";

const Logout = () => {
  console.log("logout");
  logout();
  window.location = "/";
};

export default Logout;
