import { jatbe } from "@/api/instance";
import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";

export default function usePutTokenInInterceptor() {
  //effect description
  const { getToken } = useAuth();
  useEffect(() => {
    jatbe.interceptors.request.use(
      async function (config) {
        const token = localStorage.getItem("clerk-db-jwt");
        if (token) {
          config.headers.Authorization = `Bearer ${await getToken()}`;
        }
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );
  }, []);
}
