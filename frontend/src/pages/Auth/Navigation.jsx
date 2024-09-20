import React from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarImage } from "../../components/ui/avatar";
import { useLogoutMutation } from "../../redux/api/userApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/features/Auth/userAuthSlice";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [Logout, { isLoading, error }] = useLogoutMutation();
  const dispatch = useDispatch();
  console.log(userInfo);

  const handleLogout = async (e) => {
    e.preventDefault();
    console.log("logout");

    try {
      const rest = await Logout().unwrap();
      console.log(rest);
      dispatch(logout());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" flex flex-col justify-between h-screen p-4 bg-black w-16 hover:w-48 transition-all duration-300 group z-999 absolute">
      <div className=" flex flex-col gap-4">
        <div>
          <Link to="/" className="text-white flex items-center flex-row gap-2">
            <AiOutlineHome />
            <span className="hidden group-hover:inline">Home</span>
          </Link>
        </div>
        <div>
          <Link
            to="/cart"
            className="text-white flex items-center flex-row gap-2"
          >
            <AiOutlineShoppingCart />
            <span className="hidden group-hover:inline">Cart</span>
          </Link>
        </div>
        <div>
          <Link
            to="/categories"
            className="text-white flex items-center flex-row gap-2"
          >
            <AiOutlineShopping />
            <span className="hidden group-hover:inline">Categories</span>
          </Link>
        </div>
        <div>
          <Link
            to="/wishlist"
            className="text-white flex items-center flex-row gap-2"
          >
            <FaHeart />
            <span className="hidden group-hover:inline">Wishlist</span>
          </Link>
        </div>
      </div>
      <div className=" flex flex-col gap-4">
        <div>
          <Link
            to="/login"
            className="text-white flex items-center flex-row gap-4"
          >
            <AiOutlineLogin />
            <span className="hidden group-hover:inline">Login</span>
          </Link>
        </div>
        <div>
          <Link
            to="/register"
            className="text-white flex items-center flex-row gap-2"
          >
            <AiOutlineUserAdd />
            <span className="hidden group-hover:inline">Register</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
