import { RouterProvider } from "react-router-dom";
import { router } from "./route-setup/router";

export default function JobBuddy() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}
