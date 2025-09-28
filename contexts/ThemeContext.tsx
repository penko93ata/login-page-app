"use client";

import { useIsDarkMode } from "@/lib/hooks";
import { createContext, FC, PropsWithChildren, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

type ThemeContextProps = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const isDarkModePreferred = useIsDarkMode();
  const [theme, setTheme] = useState<Theme | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      setTheme(isDarkModePreferred ? "dark" : "light");
    }
    setIsLoaded(true);
  }, [isDarkModePreferred]);

  useEffect(() => {
    if (theme) {
      // Apply theme to document
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(theme);
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  // Don't render children until theme is determined
  if (!isLoaded || !theme) {
    return null;
  }

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
