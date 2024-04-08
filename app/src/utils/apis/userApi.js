import { axiosClient } from "../axiosConfig";

export const userApi = {
  getUser: (id) => axiosClient.get(`/users/${id}`),
  getUsers: () => axiosClient.get("/users"),
  updateUser: (id, user) => axiosClient.put(`/users/${id}`, user),
  deleteUser: (id) => axiosClient.delete(`/users/${id}`),
};
