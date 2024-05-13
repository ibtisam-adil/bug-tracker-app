import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const login = createAsyncThunk("login/loginUser", async (user) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/login",
      {
        user: user,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    localStorage.setItem("token", response.headers.authorization);
    const data = response.data;
    console.log("byyyy", data);
    toast.success(data.message);
    return data;
  } catch (error) {
    console.log("sssssss".error);
    toast.error(error);
  }
});

export const logout = createAsyncThunk("login/logoutUser", async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.delete("http://localhost:3000/logout", {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    const data = response.data;
    localStorage.removeItem("token");
    toast.success(data.message);
    return data;
  } catch (error) {
    console.log(error.response.data.message);
  }
});

export const currentUser = createAsyncThunk("login/currentUser", async () => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get("http://localhost:3000/current_user", {
      headers: {
        Authorization: token,
      },
    });
    const data = response.data;
    console.log(data);
    return data;
  } catch (error) {
    console.log(error.response.data.errors);
  }
});

export const signup = createAsyncThunk("signup/signupUser", async (user) => {
  try {
    const response = await axios.post("http://localhost:3000/signup", {
      user: user,
    });
    const data = response.data;
    localStorage.setItem("token", response.headers.authorization);
    toast.success(response.data.message);
    return data;
  } catch (error) {
    toast.error(error.response.data.errors[0]);
  }
});

export const fetchDevelopers = createAsyncThunk(
  "developers/fetchDevelopers",
  async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:3000/users/developers", {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    return response.data;
  }
);

export const fetchQas = createAsyncThunk("qas/fetchQas", async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get("http://localhost:3000/users/qas", {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
  return response.data;
});
