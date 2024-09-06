import React from "react";
import { Button } from "../../components/ui/button";

const Login = () => {
  return (
    <div className="py-40 px-20 text-black flex justify-center align-center flex-col">
      <form className="flex flex-col w-40">
        <input type="email" />
        <label htmlFor="email">Email</label>
        <input type="password" />
        <label htmlFor="password">Password</label>
        <Button>Login</Button>
      </form>
      <div className="flex">
        <a href="/register">Register </a>
      </div>
    </div>
  );
};

export default Login;
