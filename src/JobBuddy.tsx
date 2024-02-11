import { RouterProvider } from "react-router-dom";
import { router } from "./route-setup/router";
import usePutTokenInInterceptor from "./hooks/usePutTokenInInterceptor";

export default function JobBuddy() {
  usePutTokenInInterceptor();

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}
