import { MyResource } from "@/types";
import { jatbe } from "./instance";

async function getMyResources(): Promise<MyResource[]> {
  return jatbe.get("myResources").then((response) => response.data);
}
async function createMyResource(
  myResourceDetails: any
): Promise<MyResource> {
  return jatbe
    .post("myResources", {
      myResourceDetails,
    })
    .then((response) => response.data);
}

async function editMyResource({
  myResourceDetails,
  myResourceId,
}: {
  myResourceDetails: any;
  myResourceId: string;
}): Promise<MyResource> {
  return jatbe
    .patch("myResources/" + myResourceId, {
      myResourceDetails,
    })
    .then((response) => response.data);
}

async function deleteMyResource(
  myResourceId: string
): Promise<MyResource> {
  return jatbe
    .delete("myResources/" + myResourceId)
    .then((response) => response.data);
}

export const myResources = {
  getMyResources,
  createMyResource,
  editMyResource,
  deleteMyResource,
};
