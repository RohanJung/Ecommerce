import React from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarImage } from "../../components/ui/avatar";
import { useLogoutMutation } from "../../redux/api/userApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/features/Auth/userAuthSlice";
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
    <div className=" ">
      <div>
        <Link to="/">Home</Link>
      </div>
      <div>
        <Link to="/cart">Cart</Link>
      </div>
      <div>
        <Link to="/product">Product</Link>
      </div>
      <div>
        <Link to="/categories">Categories</Link>
      </div>
    </div>
  );
};

export default Navigation;
