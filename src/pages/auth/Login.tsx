import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-hot-toast";
//
import dashboardScreens from "../../assets/images/dashboardScreens.png";
import logo from "../../assets/images/logo.png";
import googleIcon from "../../assets/icons/google.png";
import facebookIcon from "../../assets/icons/facebook.png";
//
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { auth } from "../../config/firebase";
import {
  handleFacebookSignIn,
  loginWithGoogle,
} from "../../helper/firebaseAuth";
// import { useGoogleLogin } from "@react-oauth/google";

export const Login = () => {
  const navigate = useNavigate();

  const ipcRenderer = (window as any).ipcRenderer;

  // const loginGoogle = useGoogleLogin({
  //   onSuccess: (codeResponse) => console.log(codeResponse),
  //   // redirectUri: "http://localhost:3000/dashboard",",
  //   select_account: true,
  //   redirect_uri: "",
  //   flow: "auth-code",
  // });

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    await signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        if (user) {
          toast.success("Logged in successfully");
          navigate("/dashboard");
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.code);
      });
  };

  // useEffect(() => {
  //   // Listen for OAuth callback in the main process
  //   ipcRenderer.on("google-oauth-callback", (event: any, callbackUrl: any) => {
  //     // Handle the callback URL here
  //     console.log("OAuth callback URL:", callbackUrl);
  //   });

  //   // Clean up the listener when the component unmounts
  //   return () => {
  //     ipcRenderer.removeAllListeners("google-oauth-callback");
  //   };
  // }, []);

  const handleGoogleSignIn = () => {
    // Define your Google OAuth URL with the appropriate parameters
    const googleOAuthUrl =
      "https://accounts.google.com/o/oauth2/auth?" +
      "response_type=code&" +
      "client_id=539580232204-b1630o2p9l3co55ljvv74445sbalj3mr.apps.googleusercontent.com&" + // Replace with your client ID
      `redirect_uri=http://localhost:9090/oauth-callback&` + // Use the Express server URL
      "scope=https://www.googleapis.com/auth/userinfo.profile"; // Adjust scopes as needed

    // Send the URL to the main process to open in an external browser
    ipcRenderer.send("open-external-browser", { url: googleOAuthUrl });
  };

  return (
    <section
      className="
    bg-bg-color h-[100vh] min-h-[100%]  text-darkgray
    flex justify-center items-center    
    py-16 px-40 
    "
    >
      <div className="flex w-full h-full shadow-md rounded-2xl ">
        <div className="bg-primary hidden lg:flex justify-center items-center flex-col w-full  md:w-[50%] rounded-s-2xl ">
          <h1
            className="
            mb-28
            font-medium 
            text-white 
            text-6xl 
            text-center
            leading-[72px]
            "
          >
            Organize your <br /> information
          </h1>
          <img
            className="w-[400px] mx-auto"
            src={dashboardScreens}
            alt="dashboard screens"
          />
        </div>
        <div className="flex justify-between items-center flex-col w-[100%] lg:w-[50%] py-32  xl:px-40 bg-white  rounded-xl lg:rounded-e-xl">
          <div className="w-full flex flex-col justify-center items-center">
            <img src={logo} alt="logo" width={40} />
            <h2 className="font-semibold text-2xl my-5">Login</h2>
          </div>
          <form className="w-full flex flex-col justify-center items-center">
            <div className="w-full p-5 max-w-[400px]">
              <label className="ml-1 font-semibold opacity-80">Email</label>
              <br />
              <Input
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                placeholder="abc@gmail.com"
                type="email"
              />
            </div>
            <div className="w-full p-5 max-w-[400px]">
              <label className="ml-1 font-semibold opacity-80">Password</label>
              <br />
              <Input
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="*************"
                type="password"
              />
            </div>

            <Button
              type="submit"
              onClick={handleLogin}
              className="max-w-[300px] my-10"
            >
              Log in
            </Button>

            <div className="flex justify-center items-center gap-3 w-full">
              <div className="w-1/4 bg-darkgray h-[1px] opacity-40" />
              <h4>or continue with</h4>
              <div className="w-1/4 bg-darkgray h-[1px] opacity-40" />
            </div>

            <div className="flex gap-5 py-4">
              <img
                src={googleIcon}
                className="cursor-pointer"
                onClick={() =>
                  loginWithGoogle()
                    .then((user) => {
                      if (user) {
                        toast.success("Logged in successfully");
                        navigate("/dashboard");
                      }
                    })
                    .catch((error) => {
                      console.error(error);
                      toast.error(error.code);
                    })
                }
                width={35}
                alt="google icon"
              />
              <img
                src={facebookIcon}
                className="cursor-pointer"
                onClick={() =>
                  handleFacebookSignIn()
                    .then((user) => {
                      if (user) {
                        toast.success("Logged in successfully");
                        navigate("/dashboard");
                      }
                    })
                    .catch((error) => {
                      console.error(error);
                      toast.error(error.code);
                    })
                }
                width={35}
                alt="facebook icon"
              />
            </div>
          </form>
          <p className="mt-10 -mb-10">
            Don't have an account?{" "}
            <Link
              className="
            text-primary
          "
              to="/signup"
            >
              Create free account
            </Link>
            <button onClick={handleGoogleSignIn}>Open External Webpage</button>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
