import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const Navigate = useNavigate();
  return (
    <div>
      {" "}
      <header className="relative flex flex-row bg-slate-100 justify-between h-20 items-center px-6">
        <div className="mr-6 text-xl font-bold text-blue-700 ">EVENTZ</div>
        <div className="flex items-center gap-6">
          <nav className="flex gap-6">
            <ul className="flex flex-row gap-6 ">
              <li className="hover:text-blue-500">
                <Link to="/">Home</Link>
              </li>
              <li className="hover:text-blue-500">
                <Link to="/event-list">Events</Link>
              </li>
            </ul>
          </nav>
          <button
            className="bg-blue-600 text-white rounded-xl p-3 hover:bg-blue-800 hover:shadow-m"
            onClick={() => {
              Navigate("/sign-in");
            }}
          >
            Get started
          </button>
        </div>
      </header>
    </div>
  );
};

export default Header;
