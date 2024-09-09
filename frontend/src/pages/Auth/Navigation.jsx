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
    <div>
      <div className="w-40 bg-black h-screen flex flex-col justify-between z-10 fixed">
        <div className="flex flex-col pt-10 pl-4">
          <div>
            <Link className="text-white" to="/">
              Home
            </Link>
          </div>
          <div>
            <Link className="text-white" to="/shop">
              Shop
            </Link>
          </div>
          <div>
            <Link className="text-white" to="/cart">
              Cart
            </Link>
          </div>
          <div>
            <Link className="text-white" to="/favourites">
              Favourites
            </Link>
          </div>
        </div>
        {userInfo ? (
          <div className="pl-8 pb-10">
            <Avatar>
              {" "}
              <AvatarImage src="https://github.com/shadcn.png" />
            </Avatar>
            <DropdownMenu>
              <DropdownMenuTrigger className="text-white">
                Profile
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  {" "}
                  <Link to="/Admin/Profile">Profile</Link>
                </DropdownMenuItem>
                {userInfo?.isAdmin && (
                  <DropdownMenuItem>
                    {" "}
                    <Link to="/Admin/Dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={(e) => handleLogout(e)}>
                  Logout
                </DropdownMenuItem>
                <DropdownMenuItem>
                  {" "}
                  <Link to="/admin/ViewUsers">All Users</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <div className="flex flex-col pb-10 pl-4">
            <div>
              <Link to="/login" className="text-white">
                Login
              </Link>
            </div>
            <div>
              <Link to="/register" className="text-white">
                Register
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navigation;
