import { backendURL } from "@/global/variables";
import axios from "axios";

export const jatbe = axios.create({
  baseURL: backendURL + "/api",
  //   timeout: 4000,
  headers: {},
});
