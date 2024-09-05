import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="w-20 bg-black h-screen">
      <div>
        <div>
          <Link to="/" className="text-white">
            Home
          </Link>
        </div>
        <div>
          <Link to="/" className="text-white">
            Shop
          </Link>
        </div>
        <div>
          <Link to="/" className="text-white">
            Cart
          </Link>
        </div>
        <div>
          <Link to="/" className="text-white">
            Favourites
          </Link>
        </div>
      </div>
      <div>
        <div>
          <Link to="/" className="text-white">
            Login
          </Link>
        </div>
        <div>
          <Link to="/" className="text-white">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
