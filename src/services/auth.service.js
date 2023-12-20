import axios from "axios";
import { API_URL } from "../constants/baseUrl";
import { useDispatch } from "react-redux";
import { authActions } from "../slices/auth";

const login = (username, password) => {
  return axios
    .post(API_URL + "auth/login", {
      username,
      password,
      role: "admin",
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    })
    .catch((error) => {
      console.log("in axious catch", error);
      return error;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  login,
  logout,
};

export default authService;
