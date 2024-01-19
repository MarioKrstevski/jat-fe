import { SignIn, useAuth } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
export default function SignInPage() {
  const { userId, isLoaded } = useAuth();

  if (isLoaded && userId) {
    return <Navigate to={"/jobs"} />;
  }

  return <SignIn />;
}
