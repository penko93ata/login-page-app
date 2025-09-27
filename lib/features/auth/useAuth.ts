import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect } from "react";
import { checkAuth, logoutUser, setUser, clearUser, setError, clearError, type User } from "./authSlice";

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

  // Function to clear user (e.g., when session expires)
  const clearAuthUser = () => {
    dispatch(clearUser());
  };

  // Function to logout
  const logout = () => {
    dispatch(logoutUser());
  };

  // Function to manually check auth (e.g., after login)
  const refreshAuth = () => {
    dispatch(checkAuth());
  };

  // Function to set error
  const setAuthError = (error: string) => {
    dispatch(setError(error));
  };

  // Function to clear error
  const clearAuthError = () => {
    dispatch(clearError());
  };

  return {
    // State
    user,
    isAuthenticated,
    isLoading,
    error,

    // Actions
    setAuthUser,
    clearAuthUser,
    logout,
    refreshAuth,
    setAuthError,
    clearAuthError,
  };
}
