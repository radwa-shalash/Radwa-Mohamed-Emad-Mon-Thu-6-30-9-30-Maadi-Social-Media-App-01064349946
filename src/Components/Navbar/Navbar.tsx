import { useContext, useState } from "react";
import { FaBars } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { IoHome } from "react-icons/io5";
import { ImProfile } from "react-icons/im";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { IoShareSocial } from "react-icons/io5";
import { FaCashRegister } from "react-icons/fa6";
import { RiLoginBoxFill } from "react-icons/ri";
import { PiPasswordFill } from "react-icons/pi";
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { userLogin, setuserLogin  } = useContext(AuthContext);
  const navigate = useNavigate();

  function logOut() {
    localStorage.removeItem("userToken");
    setuserLogin(null);
    
    navigate("/login");
  }

  return (
    <>
      <nav className=" bg-slate-200 shadow-md sticky top-0 z-50  ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className=" flex justify-between items-center h-16">
            {/* logo */}

            <div className="shrink-0 flex items-center">
              <Link to="/" className="text-2xl font-bold text-indigo-600 flex items-center gap-1">
             <IoShareSocial />   Social App
              </Link>
            </div>
            {/* {Desktop Menu} */}
            <div className="hidden md:flex md:items-center md:space-x-8">
              {userLogin ? (
                <>
                  <Link 
                    to="/"
                    className="text-gray-700 hover:text-indigo-600 transition-colors font-medium flex gap-1 items-center"
                  >
                    <IoHome />
                    Home
                  </Link>
                  <Link
                    to="/profile"
                    className="text-gray-700 hover:text-indigo-600 transition-colors font-medium flex gap-1 items-center"
                  >
                    <ImProfile />
                    Profile
                  </Link>
                  <Link
                    to="/changepassword"
                    className="text-gray-700 hover:text-indigo-600 transition-colors font-medium flex gap-1 items-center"
                  >
                    <PiPasswordFill />
                    Change Password
                  </Link>
                  <button
                    onClick={() => {
                      logOut();
                    }}
                    className=" bg-indigo-600 text-white hover:bg-indigo-700 transition-colors font-medium rounded-lg px-4 py-2 flex items-center gap-1 justify-center"
                  >
                    <RiLogoutBoxRFill />
                    LogOut
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="text-gray-700 hover:text-indigo-600 transition-colors font-medium flex items-center gap-1"
                  >
                    <FaCashRegister />
                    Register
                  </Link>
                  <Link
                    to="/login"
                    className="  bg-indigo-600 text-white hover:bg-indigo-700 transition-colors font-medium rounded-lg px-4 py-2 flex items-center gap-1 justify-center"
                  >
                    <RiLoginBoxFill />
                    Login
                  </Link>
                </>
              )}
            </div>
            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-gray-100 focus:outline-none "
                aria-expanded={isOpen}
              >
                {/* Icon When Closed */}
                {!isOpen ? <FaBars /> : <IoMdClose />}
              </button>
            </div>
          </div>
        </div>
        {/* Mobile Menu */}
        <div className={`md:hidden ${isOpen ? "block" : "hidden"}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
            <div className="flex flex-col gap-4">
              {userLogin ? (
                <>
                  <Link
                    to="/"
                    className="text-gray-700 hover:text-indigo-600 transition-colors font-medium flex gap-1 items-center"
                  >
                    <IoHome />
                    Home
                  </Link>
                  <Link
                    to="/profile"
                    className="text-gray-700 hover:text-indigo-600 transition-colors font-medium flex gap-1 items-center"
                  >
                     <ImProfile />
                    Profile
                  </Link>
                  <Link
                    to="/changepassword"
                    className="text-gray-700 hover:text-indigo-600 transition-colors font-medium flex gap-1 items-center"
                  >
                     <PiPasswordFill />
                    Change Password
                  </Link>
                  <button
                    onClick={() => {
                      logOut();
                    }}
                    className=" bg-indigo-600 text-white hover:bg-indigo-700 transition-colors font-medium rounded-lg px-4 py-2 flex items-center gap-1 justify-center"
                  >
                    <RiLogoutBoxRFill />
                    LogOut
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="text-gray-700 hover:text-indigo-600 transition-colors font-medium flex items-center gap-1"
                  >
                    <FaCashRegister />
                    Register
                  </Link>
                  <Link
                    to="/login"
                    className="  bg-indigo-600 text-white hover:bg-indigo-700 transition-colors font-medium rounded-lg px-4 py-2 flex items-center gap-1 justify-center"
                  >
                    <RiLoginBoxFill />
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
