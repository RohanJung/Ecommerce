import React from "react";
import { Button } from "../../components/ui/button";
import { useState } from "react";
import { useRegisterMutation } from "../../redux/api/userApiSlice";
import { useDispatch, useSelector } from "react-redux";
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
    <div>
      <form
        action=""
        method="post"
        className="flex flex-col px-20"
        onSubmit={handleSubmit}
      >
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            className="border border-solid border-red-400"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            className="border border-solid border-red-400"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            className="border border-solid border-red-400"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <Button>Click me</Button>
        </div>
      </form>
    </div>
  );
};

export default Register;
