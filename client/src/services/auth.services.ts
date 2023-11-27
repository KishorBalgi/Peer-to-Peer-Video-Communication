"use client";
import api from "@/utils/axios.util";
import { store } from "@/redux/store";
import { addUser, removeUser } from "@/redux/features/user/user.slice";
import { IFormCallbackResponse } from "@/types/general";

// Sign up:
export const signup = async (
  data: FormData
): Promise<IFormCallbackResponse> => {
  const body = {
    name: data.get("name"),
    email: data.get("email"),
    password: data.get("password"),
  };
  try {
    const res = await api.post("/auth/signup", body);

    if (res.data.status === "success") {
      const { data } = res.data;
      const user = {
        id: data.id,
        name: data.name,
        email: data.email,
        createdAt: data.createdAt,
        token: res.data.jwttoken,
      };

      // Set user in redux store:
      store.dispatch(addUser(user));
      return {
        status: res.data.status,
        message: "Signed up successfully",
        redirect: "/",
      };
    }
    return { status: res.data.status, message: "Something went wrong" };
  } catch (err: any) {
    return {
      status: err.response?.data.status,
      message: err.response?.data.message,
    };
  }
};

// login:
export const login = async (data: FormData): Promise<IFormCallbackResponse> => {
  const body = {
    email: data.get("email"),
    password: data.get("password"),
  };
  try {
    const res = await api.post("/auth/login", body);
    if (res.data.status === "success") {
      const { data } = res.data;
      const user = {
        id: data.id,
        name: data.name,
        email: data.email,
        createdAt: data.createdAt,
        token: res.data.jwttoken,
      };

      // Set user in redux store:
      store.dispatch(addUser(user));
      return { status: res.data.status, message: "Logged In", redirect: "/" };
    }
    return { status: res.data.status, message: "Something went wrong" };
  } catch (err: any) {
    console.log(err);
    return {
      status: "error",
      message: err.response?.data.message,
    };
  }
};

// Is Authenticated:
export const isAuthenticated = async (): Promise<IFormCallbackResponse> => {
  try {
    const res = await api.get("/auth/is-authenticated");
    if (res.data.status === "success") {
      const { data } = res.data;
      const user = {
        id: data.id,
        name: data.name,
        email: data.email,
        createdAt: data.createdAt,
        token: res.data.jwttoken,
      };

      // Set user in redux store:
      store.dispatch(addUser(user));
    }
    return { status: res.data.status, message: "Authenticated" };
  } catch (err: any) {
    return {
      status: err.response?.data.status,
      message: err.response?.data.message,
    };
  }
};

// logout:
export const logout = async (): Promise<IFormCallbackResponse> => {
  try {
    const res = await api.get("/auth/logout");
    if (res.data.status === "success") {
      store.dispatch(removeUser());
    }
    return { status: "success", message: "Logged Out", redirect: "/" };
  } catch (err: any) {
    return {
      status: err.response?.data.status,
      message: err.response?.data.message,
    };
  }
};
