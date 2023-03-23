import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="/employees">Employees</Link>
      <Link to="/register">Registration</Link>
    </div>
  );
};

export default Navbar;
