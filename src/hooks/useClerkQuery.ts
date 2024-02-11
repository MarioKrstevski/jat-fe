import { api } from "@/api/backend";
import { jatbe } from "@/api/instance";
import { useAuth } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import { useJobApplicationsStore } from "./useJobApplicationsStore";

export default function useClerkQuery(url: any) {
  const { getToken } = useAuth();
  const jobApplicationStore = useJobApplicationsStore();

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

  return useQuery({
    queryKey: [url],
    queryFn: () =>
      api.applications
        .getJobApplications()
        .then((res) => {
          // addCustomKeyValue
          jobApplicationStore.setJobApplications(res.data);

          return res.data;
        })
        .catch((err) => {
          console.log("Err", err);
        }),
    // queryFn: async () => {
    //   const res = await fetch(url, {
    //     headers: { Authorization: `Bearer ${await getToken()}` },
    //   });

    //   if (!res.ok) {
    //     throw new Error("Network response error");
    //   }

    //   return res.json();
    // },
  });
}
