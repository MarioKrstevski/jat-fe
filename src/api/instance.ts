import { backendURL } from "@/global/variables";
import { useAuth } from "@clerk/clerk-react";
import axios, { AxiosResponse } from "axios";

export const jatbe = axios.create({
  baseURL: backendURL + "/api",
  //   timeout: 4000,
  headers: {},
});
