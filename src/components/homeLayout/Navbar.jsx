import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { close, logo, menu } from "../../assets";
import { navLinks } from "../../constants";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <nav className="w-full flex py-6 justify-between items-center">
      <Link to="/">
        <img src={logo} alt="ParkEase" className="w-[124px] h-[32px] " />
      </Link>
      <ul className="list-none sm:flex hidden justify-end items-center flex-1">
        {navLinks.map((nav, index) => (
          <li
            key={nav.id}
            className={`font-poppins font-normal cursor-pointer text-[16px] text-gray-200 ${
              index === navLinks.length - 1 ? "mr-0" : "mr-10"
            }`}
          >
            <NavLink
              to={nav.url}
              className={({ isActive }) =>
                isActive
                  ? "text-gradient font-poppins font-bold"
                  : "text-gray-200"
              }
            >
              {nav.title}
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="sm:hidden flex flex-1 justify-end items-center">
        <img
          src={toggle ? close : menu}
          alt="menu"
          className="w-[28px] h-[28px] object-contain"
          onClick={() => setToggle((prev) => !prev)}
        />
        <div
          className={`${
            toggle ? "flex" : "hidden"
          } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl z-50`}
        >
          <ul className="list-none flex flex-col justify-end items-center flex-1">
            {navLinks.map((nav, index) => (
              <li
                key={nav.id}
                className={`font-poppins font-normal cursor-pointer text-[16px] text-white  ${
                  index === navLinks.length - 1 ? "mb-0" : "mb-4"
                }`}
              >
                <NavLink
                  to={nav.url}
                  className={({ isActive }) =>
                    isActive
                      ? "text-gradient  font-poppins font-bold"
                      : "text-gray-200"
                  }
                >
                  {nav.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
