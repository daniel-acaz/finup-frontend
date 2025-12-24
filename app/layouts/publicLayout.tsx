import { Outlet, Navigate } from "react-router";
import { useAuth } from "../shared/authContext";
import { NavBar } from "~/components/navbar/navbar";

export default function PublicLayout() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading session...</div>;
  }

  if (user) {
    // User is already logged in, they shouldn't see the login page
    return <>
            <Navigate to="/invoices" replace />
            <NavBar />
        </>;
  }

  // If no user, render the child route (e.g., Login or Register)
  return <Outlet />;
}