// src/ProtectedRoute.jsx
import React from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
// import { useAuth } from "@clerk/clerk-react";
import { RedirectToSignIn, useUser } from "@clerk/clerk-react";


const ProtectedRoute = () => {
  const { isSignedIn, isLoaded } = useUser();
  const location = useLocation();

  if (!isLoaded) {
    // Clerk abhi load ho raha hai → koi spinner ya blank return kar do
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {

    return <RedirectToSignIn/>;
  }

  return <Outlet />;
};

export default ProtectedRoute;
