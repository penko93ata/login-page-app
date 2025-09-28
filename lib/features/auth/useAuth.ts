import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect } from "react";
import { checkAuth, logoutUser, setUser, type User } from "./authSlice";

export function useAuth() {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, isLoading, error } = useAppSelector((state) => state.auth);

  // Check authentication status on mount
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  // Function to manually set user (e.g., after successful login)
  const setAuthUser = (user: User) => {
    dispatch(setUser(user));
  };

  // Function to logout
  const logout = () => {
    dispatch(logoutUser());
  };

  return {
    // State
    user,
    isAuthenticated,
    isLoading,
    error,

    // Actions
    setAuthUser,
    logout,
  };
}
