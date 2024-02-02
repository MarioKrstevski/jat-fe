import { backendURL } from "@/global/variables";
import { useAuth } from "@clerk/clerk-react";
import axios, { AxiosResponse } from "axios";

export const jatbe = axios.create({
  baseURL: backendURL,
  //   timeout: 4000,
  headers: {},
});

// jatbe.interceptors.request.use(
//   function (config) {
//     const token = localStorage.getItem("clerk-db-jwt");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );
// jatbe.interceptors.request.use(
//   async (config) => {
//     const { getToken } = useAuth();

//     const token = await getToken();
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );
