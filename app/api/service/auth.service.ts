import api from "../axios";

const register = (data: any) => {
  return api.post(`auth/register/user`, data);
};

const login = (email: string, password: string) => {
  return api.post(`auth/login/user`, { email, password }).then((response) => {
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
    return response.data;
  });
};

const verifyEmail = (email: string, code: string) => {
  return api.post(`auth/validate/code`, { email, code }).then((response) => {
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
    return response.data;
  });
};

const verifyToken = (token: string) => {
  return api.post(`auth/verify/user/token`, { token });
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
