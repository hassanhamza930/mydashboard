import React from "react";
import { ToastProvider } from "./Toaster";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ToastProvider />
      {children}
    </>
  );
};
