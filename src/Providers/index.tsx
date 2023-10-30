import React from "react";
import { ToastProvider } from "./Toaster";
import { RecoilRootProvider } from "./Recoil";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <RecoilRootProvider>
        <ToastProvider />
        {children}
      </RecoilRootProvider>
    </>
  );
};
