import React from "react";
import { ToastProvider } from "./Toaster";
import { GoogleOAuthProvider } from "@react-oauth/google";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ToastProvider />
      <GoogleOAuthProvider
        onScriptLoadSuccess={() =>
          console.log("Google OAuth script loaded successfully")
        }
        clientId="539580232204-kcoea2ss6bqbtbabmjp60i9hd8j88jib.apps.googleusercontent.com"
      >
        {children}
      </GoogleOAuthProvider>
    </>
  );
};
