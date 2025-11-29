import axios from "axios";

const API_URL = "http://localhost:5000/auth";

const register = (data: any) => {
  return axios.post(`${API_URL}/register/user`, data);
};

const login = (email: string, password: string) => {
  return axios
    .post(`${API_URL}/login/user`, { email, password })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }
      return response.data;
    });
};

const verifyEmail = (email: string, code: string) => {
  return axios
    .post(`${API_URL}/validate/code`, { email, code })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }
      return response.data;
    });
};

const verifyToken = (token: string) => {
  return axios.post(`${API_URL}/verify/user/token`, { token });
};

const logout = () => {
  localStorage.removeItem("token");
};

const authService = {
  register,
  login,
  verifyEmail,
  verifyToken,
  logout,
};

export default authService;