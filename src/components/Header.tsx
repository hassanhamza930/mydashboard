import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
//
import SearchInput from "./ui/SearchInput";
//
import logo from "../assets/images/logo2.png";
import dummyProfile from "../assets/images/dummyProfile.webp";
import notification from "../assets/icons/notification.svg";
import logout from "../assets/icons/logout.svg";

const Header = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  return (
    <nav className=" ">
      <div className="nav-wrapper flex justify-between items-center px-10 py-5">
        <div className="flex justify-center items-center">
          <img src={logo} width={200} alt="logo" />
          {/* </div>
        <div className="search "> */}
          <SearchInput
            type="text"
            placeholder="Search MyDashboard"
            className="
            w-[500px]
            ml-6
            hidden
            lg:flex
            "
          />
        </div>
        <div className="flex gap-x-5 justify-center items-center">
          <div className="flex gap-x-2 justify-center items-center">
            <img
              className="
                    w-10
                    h-10
                    rounded-full
                    object-cover
                    shadow-md
                    bg-white
                    border-2
                    border-white
                "
              src={dummyProfile}
              alt=""
            />
            <div>
              <h4 className="text-md font-semibold">Spiro Mrda</h4>
              <h5 className="text-[11px] text-yellow-600 -mt-1">
                premium user
              </h5>
            </div>
          </div>

          <img
            src={notification}
            className="cursor-pointer"
            onClick={() => {}}
            alt=""
          />
          <img
            src={logout}
            className="cursor-pointer"
            onClick={async () => {
              await signOut(auth);
              await auth.signOut();
              navigate("/login");
            }}
            alt=""
          />
        </div>
      </div>
    </nav>
  );
};

export default Header;