import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { store } from "./redux/store.js";
import { Provider } from "react-redux";
import Login from "./pages/Auth/Login.jsx";
import Profile from "./pages/User/Profile.jsx";
import Register from "./pages/Auth/Register.jsx";
import Admin from "./pages/Admin/Admin.jsx";
import UserList from "./pages/Admin/UserList.jsx";
import User from "./pages/User/User.jsx";
import Category from "./pages/Admin/CategoryList.jsx";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />

      <Route path="/Admin" element={<Admin />}>
        <Route path="UserList" element={<UserList />} />
        <Route path="Category" element={<Category />} />
      </Route>

      <Route path="/User" element={<User />}>
        <Route path="profile" element={<Profile />} />
      </Route>
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
