import { useDispatch, useSelector, useStore } from "react-redux";
import { AppDispatch, AppStore, RootState } from "./store";
import { useEffect, useState } from "react";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();

export function useIsDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window === "undefined") return false;

    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    const controller = new AbortController();

    window.matchMedia("(prefers-color-scheme: dark)").addEventListener(
      "change",
      () => {
        setIsDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches);
      },
      { signal: controller.signal }
    );

    return () => {
      controller.abort();
    };
  }, []);

  return isDarkMode;
}
