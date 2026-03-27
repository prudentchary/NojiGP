import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'; // This points to your Zustand store

const ProtectedRoute = () => {
  const isAuthenticated = useAuth((state) => state.isAuthenticated);

  // If the "Shared Notebook" says false, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If true, show the page they asked for
  return <Outlet />;
};

export default ProtectedRoute;