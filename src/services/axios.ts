import axios from "axios";
import { User } from "../types/global";

export const instance = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const getAllUsers = async () => {
  const response = await instance.get("/api/users");
  return response;
};

export const add = async (data: User) => {
  const response = await instance.post("/api/users/create", data);
  return response;
};

export const userDelete = async (email: string) => {
  const response = await instance.post("/api/users/delete", { email: email });
  return response;
};

export const userEdit = async (user: User) => {
  const response = await instance.post("/api/users/edit", user);
  return response;
};
