import { Outlet, Navigate, useLocation } from "react-router";
import { useAuth } from "../shared/authContext";
import { NavBar } from "~/components/navbar/navbar";

export default function ProtectedLayout() {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div>Loading session...</div>; // Or a proper loading spinner
  }

  if (!user) {
    // Redirect to login, but remember where they were trying to go
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If user exists, render the child route (e.g., Dashboard)
  return <>
            <Outlet />
            <NavBar />  
        </>; 
}