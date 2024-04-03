import axios from "axios";
import auth from "./authService";

// const baseURL = "http://localhost:2410";
const baseURL = "https://dull-puce-cocoon-boot.cyclic.app";

let user = auth.getToken();
let token = user ? user.token : "";

function get(url) {
  return axios.get(baseURL + url, { headers: { Authorization: token } });
}

function post(url, obj) {
  return axios.post(baseURL + url, obj);
}

function put(url, obj) {
  return axios.put(baseURL + url, obj, { headers: { Authorization: token } });
}

export default { get, post, put };
