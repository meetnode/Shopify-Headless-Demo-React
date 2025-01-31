import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { HiXMark } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks";
import { logout } from "../features/auth/authSlice";
import { store } from "../store";

const SidebarMenu = ({
  name = "FASHION",
  isSidebarOpen,
  setIsSidebarOpen,
}: {
  name: string;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (prev: boolean) => void;
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const { loginStatus } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const logoutHandle = () => {
    toast.success("Logged out successfully");
    localStorage.removeItem("user");
    store.dispatch(logout());
    navigate("/login");
  };

  useEffect(() => {
    if (isSidebarOpen) {
      setIsAnimating(true);
    } else {
      const timer = setTimeout(() => setIsAnimating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isSidebarOpen]);

  return (
    <>
      {(isSidebarOpen || isAnimating) && (
        <div
          className={
            isSidebarOpen
              ? "fixed top-0 left-0 w-64 z-50 h-full transition-transform duration-300 ease-in-out bg-white shadow-lg transform border-r border-black translate-x-0"
              : "fixed top-0 left-0 w-64 z-50 h-full transition-transform duration-300 ease-in-out bg-white shadow-lg transform border-r border-black -translate-x-full"
          }
        >
          <div className="flex justify-end mr-1 mt-1">
            <HiXMark
              className="text-3xl cursor-pointer"
              onClick={() => setIsSidebarOpen(false)}
            />
          </div>
          <div className="flex justify-center mt-2">
            <Link
              to="/"
              className="text-3xl font-light tracking-[1.08px] max-sm:text-3xl max-[400px]:text-2xl"
            >
              {name}
            </Link>
          </div>
          <div className="flex flex-col items-center gap-1 mt-7">
            <Link
              to="/"
              className="py-2 border-y border-secondaryBrown w-full flex justify-center"
            >
              Home
            </Link>
            <Link
              to="/about-us"
              className="py-2 border-y border-secondaryBrown w-full flex justify-center"
            >
              About us
            </Link>
            <Link
              to="/shop"
              className="py-2 border-y border-secondaryBrown w-full flex justify-center"
            >
              Shop
            </Link>
            <Link
              to="/search"
              className="py-2 border-y border-secondaryBrown w-full flex justify-center"
            >
              Search
            </Link>
            {loginStatus ? (
              <>
                <button
                  onClick={logoutHandle}
                  className="py-2 border-y border-secondaryBrown w-full flex justify-center"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="py-2 border-y border-secondaryBrown w-full flex justify-center"
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className="py-2 border-y border-secondaryBrown w-full flex justify-center"
                >
                  Sign up
                </Link>
              </>
            )}
            <Link
              to="/cart"
              className="py-2 border-y border-secondaryBrown w-full flex justify-center"
            >
              Cart
            </Link>
          </div>
        </div>
      )}
    </>
  );
};
export default SidebarMenu;
