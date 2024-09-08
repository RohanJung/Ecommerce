import { Button } from "../../components/ui/button";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { setCredentials } from "../../redux/features/Auth/userAuthSlice";
import { useLoginMutation } from "../../redux/api/userApiSlice";
import { Input } from "../../components/ui/input";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading, error }] = useLoginMutation();
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      Navigate(redirect);
    }
  }, [Navigate, redirect, userInfo]);

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
