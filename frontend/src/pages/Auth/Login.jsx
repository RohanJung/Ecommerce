import { Button } from "../../components/ui/button";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { setCredentials } from "../../redux/features/Auth/userAuthSlice";
import { useLoginMutation } from "../../redux/api/userApiSlice";

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
    <div className="py-40 px-20 text-black flex justify-center align-center flex-col">
      <form className="flex flex-col w-40" onSubmit={handleSubmit}>
        <input type="email" onChange={(e) => setEmail(e.target.value)} />
        <label htmlFor="email">Email</label>
        <input type="password" onChange={(e) => setPassword(e.target.value)} />
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
