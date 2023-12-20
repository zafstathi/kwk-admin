import axios from "axios";
// import { authActions } from "../store/auth-slice";
import { API_URL } from "../constants/baseUrl";
function useReq() {
  const sendRequest = (route, type, body, cb) => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("user", user.access_token);

    const api = axios.create({
      baseURL: `${API_URL}`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + user?.access_token,
      },
    });

    api({
      method: type,
      url: `${route}`,
      data: body,
    })
      .then((response) => {
        cb(null, response);
      })
      .catch((error) => {
        cb(error, null);
      });
  };

  return { sendRequest };
}

export default useReq;
