import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { userInfo } = useSelector((state) => state.auth);
  console.log(userInfo);

  return (
    <div className="py-40 px-44 text-black flex justify-center align-center flex-col ">
      <h1>Profile</h1>
      <div>
        <div>
          <span>Name: </span>
          <span>{userInfo.username}</span>
        </div>
        <div>
          <span>Email: </span>
          <span>{userInfo.email}</span>
        </div>
        <div>
          <span>Admin: </span>
          <span>{userInfo.isAdmin ? "Yes" : "No"}</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
