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
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md p-6 bg-white rounded shadow-md">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block mb-1">
              Email
            </label>
            <Input
              id="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1">
              Password
            </label>
            <Input
              id="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full"
            />
          </div>
          <Button className="w-full">Login</Button>
        </form>
        <div className="mt-4 text-center">
          <Link to="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
