import { Button } from "../../components/ui/button";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { setCredentials } from "../../redux/features/Auth/userAuthSlice";
import { useLoginMutation } from "../../redux/api/userApiSlice";
import { Input } from "../../components/ui/input";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading, error }] = useLoginMutation();

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const rest = await login({ email, password }).unwrap();
      console.log(rest);
      dispatch(setCredentials(rest));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="py-40 px-44 text-black flex justify-center align-center flex-col ">
      <form className="flex flex-col w-40" onSubmit={handleSubmit}>
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
        <Button>Login</Button>
      </form>
      <div className="flex">
        <a href="/register">Register </a>
      </div>
    </div>
  );
};

export default Login;
