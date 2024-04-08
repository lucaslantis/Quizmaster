import { axiosClient } from "../axiosConfig";

export const authApi = {
  login: ({ email, password }) =>
    axiosClient.post("/auth/login", { email, password }),
  register: ({ name, email, password, username }) =>
    axiosClient.post("/auth/signup", { name, email, username, password }),
  checkAuth: () => axiosClient.post("/auth/check-auth"),
};
