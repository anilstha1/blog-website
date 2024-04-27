import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {authActions} from "../redux/store";
const navItems = [
  {
    name: "Home",
    to: "/",
  },
  {
    name: "My Blogs",
    to: "/blogs",
  },
  {
    name: "Add Blog",
    to: "/addblog",
  },
];
function Navbar() {
  const isLoggedIn = useSelector((state) => state.isloggedin);
  const token = localStorage.getItem("authToken");
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(authActions.login());
    }
  }, []);

  const logout = (e) => {
    dispatch(authActions.logout());
    localStorage.removeItem("authToken");
  };
  return (
    <div className="flex flex-row items-center p-3 border-b border-gray-200">
      <div className="text-lg font-bold ml-auto">Blog-app</div>
      <div className="flex flex-row gap-2 mx-auto">
        {navItems.map((navItem) => {
          return (
            <Link
              to={navItem.to}
              key={navItem.name}
              className="text-black hover:font-bold"
            >
              {navItem.name}
            </Link>
          );
        })}
      </div>
      <div className="flex mr-auto">
        {!isLoggedIn ? (
          <div className="flex gap-2">
            <Link
              to={"/login"}
              className="border flex items-center rounded-lg px-5 py-2 hover:bg-gray-800 hover:text-gray-200"
            >
              Login
            </Link>
            <Link
              to={"/signup"}
              className="border flex items-center rounded-lg px-2 bg-gray-800 text-gray-200 hover:bg-white hover:text-black"
            >
              Register
            </Link>
          </div>
        ) : (
          <button
            className="border flex items-center rounded-lg px-5 py-2 hover:bg-gray-800 hover:text-gray-200"
            onClick={logout}
          >
            logout
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
