import { Link } from "react-router-dom";
export default function Navlink({ to, icon, text }) {
  <Link to={to} classNmae="text-white felx items-center flex-row grap-2">
    {icon}
    <span className="hidden group-hover:inline">{text}</span>
  </Link>;
}
