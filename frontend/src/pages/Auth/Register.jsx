import React from "react";
import { Button } from "../../components/ui/button";
import { useState } from "react";
import { useRegisterMutation } from "../../redux/api/userApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "../../components/ui/input";
import { setCredentials } from "../../redux/features/Auth/userAuthSlice";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [register, { isLoading, error }] = useRegisterMutation();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await register({ username, email, password }).unwrap();
      console.log(result);
      dispatch(setCredentials(result));
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="py-40 px-44 text-black flex justify-center align-center flex-col ">
      <form className="flex flex-col w-40" onSubmit={handleSubmit}>
        <label htmlFor="Username">Username</label>
        <Input
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          label="Username"
        />
        <label htmlFor="Email">Email</label>
        <Input
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          label="Email"
        />
        <label htmlFor="Passowrd">Password</label>
        <Input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
        />
        <Button>Register</Button>
      </form>
    </div>
  );
};

export default Register;
