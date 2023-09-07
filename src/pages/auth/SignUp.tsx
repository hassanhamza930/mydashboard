import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast/headless";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
//
import { auth } from "../../config/firebase";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
//
import dashboardScreens from "../../assets/images/signupImg.png";
import logo from "../../assets/images/logo.png";
import googleIcon from "../../assets/icons/google.png";
import facebookIcon from "../../assets/icons/facebook.png";
import {
  handleFacebookSignIn,
  loginWithGoogle,
} from "../../helper/firebaseAuth";

export const SignUp = () => {
  const navigate = useNavigate();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSignUp = async () => {
    try {
      // Create the user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Update the user's display name (name)
      if (userCredential.user) {
        await updateProfile(userCredential.user, {
          displayName: name,
        });
      }

      toast.success("Account created successfully");
      navigate("/");
    } catch (error: any) {
      toast.error(error.code);
    }
  };

  return (
    <section
      className="
        bg-bg-color  text-darkgray
        flex justify-center items-center    
        py-16 px-40 h-[100vh] min-h-[100%] 
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
        <div className="flex justify-between items-center flex-col w-[100%] lg:w-[50%] py-32  xl:px-40 bg-white rounded-2xl lg:rounded-e-2xl">
          <div className="flex justify-center items-center flex-col">
            <img src={logo} alt="logo" width={40} />
            <h2 className="font-semibold text-2xl my-5">Create Account</h2>
          </div>
          <div className="w-full flex flex-col justify-center items-center">
            <div className="w-full p-4 max-w-[400px]">
              <label className="ml-1 font-semibold opacity-80">Name</label>
              <br />
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
                type="email"
              />
            </div>
            <div className="w-full p-4 max-w-[400px]">
              <label className="ml-1 font-semibold opacity-80">Email</label>
              <br />
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="abc@gmail.com"
                type="email"
              />
            </div>
            <div className="w-full p-4 max-w-[400px]">
              <label className="ml-1 font-semibold opacity-80">Password</label>
              <br />
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="*************"
                type="password"
              />
            </div>

            <Button onClick={handleSignUp} className="max-w-[300px] my-10">
              Sign Up
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
                        navigate("/");
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
                        navigate("/");
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
          </div>
          <p className="mt-10 -mb-10">
            Already have an account?{" "}
            <Link
              className="
        text-primary
      "
              to="/login"
            >
              login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};
