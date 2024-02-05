import { JobApplicationTag } from "@/types";
import { jatbe } from "./instance";
import { AxiosResponse } from "axios";

async function getTags(): Promise<
  AxiosResponse<JobApplicationTag[]>
> {
  return jatbe.get("tags");
}
export const tags = {
  getTags,
};
