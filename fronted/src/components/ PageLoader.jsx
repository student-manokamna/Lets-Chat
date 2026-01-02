import React from "react";
import { Loader } from "lucide-react";
import { useThemeStore } from "../store/useThemeStore";

const PageLoader = () => {
    const {theme} = useThemeStore
  return (
    <div className="flex items-center justify-center h-screen bg-base-100" data-theme ={theme}>
      <Loader className="animate-spin size-10 text-primary" />
    </div>
  );
};

export default PageLoader;
