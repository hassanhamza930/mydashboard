import logo from "../assets/images/logo2.png";
import dummyProfile from "../assets/images/dummyProfile.webp";
import notification from "../assets/icons/notification.svg";
import logout from "../assets/icons/logout.svg";
import SearchInput from "./ui/SearchInput";

const Header = () => {
  return (
    <nav className=" ">
      <div className="nav-wrapper flex justify-between items-center px-10 py-5">
        <div className="logo">
          <img src={logo} width={200} alt="logo" />
        </div>
        <div className="search ">
          <SearchInput
            type="text"
            placeholder="Search MyDashboard"
            className="
            w-[500px]
            -ml-20
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

          <img src={notification} alt="" />
          <img src={logout} alt="" />
        </div>
      </div>
    </nav>
  );
};

export default Header;
