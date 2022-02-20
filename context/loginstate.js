import { createContext } from "react";

const userDefaultValue = {
  isLoggedIn: false,
  setLoginState: () => false,
};

const UserContext = createContext(userDefaultValue);

export default UserContext;
