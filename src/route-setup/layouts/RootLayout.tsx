import React, { useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate, Outlet } from "react-router-dom";
import SplashScreen from "../../components/layout/SplashScreen";

export default function RootLayout() {
  const { userId, isLoaded } = useAuth();
  const navigate = useNavigate();

  //effect description
  useEffect(() => {
    if (isLoaded && userId) {
      // console.log("recorded", window.location.href);
      // navigate("/jobs");
    } else if (isLoaded && !userId) {
      navigate("/signin");
    }
  }, [userId, isLoaded]);

  if (!isLoaded) {
    return <SplashScreen />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
}
