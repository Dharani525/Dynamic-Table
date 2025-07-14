// src/components/Sidebar.jsx
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import lgLogo from "../assets/lg.png";
import smLogo from "../assets/sm.png";

const navItems = [
  { name: "Dashboard", path: "/" },
  { name: "Employee List", path: "/employee" },
  { name: "Product Table", path: "/product" },
  { name: "Order Table", path: "/order" },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  return (
    <>
      {/* Mobile Hamburger */}
      <div className="lg:hidden flex items-center p-4 bg-gray-800 text-white fixed w-full z-20">
        <button
          className="mr-2 focus:outline-none"
          onClick={() => setOpen(!open)}
          aria-label="Toggle sidebar"
        >
          <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        {/* Small Logo */}
        <img src={smLogo} alt="Logo" className="h-8" />
      </div>

      {/* Sidebar */}
      <div
        className={`bg-gray-800 text-white flex flex-col p-4 fixed h-screen z-30 transition-all duration-300
          w-48 sm:w-56 lg:w-64 max-w-xs
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:left-0 lg:top-0 lg:fixed lg:block`}
        style={{ top: 0, left: 0 }}
      >
        {/* Large Logo */}
        <div className="hidden lg:block mb-10">
          <img src={lgLogo} alt="Logo" className="h-20 mx-auto bg-white rounded-lg" />
        </div>
        {/* Small Logo for mobile sidebar */}
        <div className="lg:hidden mb-10 flex justify-center">
          <img src={smLogo} alt="Logo" className="h-10" />
        </div>
        <nav className="flex flex-col gap-4">
          {navItems.map(({ name, path }) => (
            <NavLink
              key={name}
              to={path}
              className={({ isActive }) =>
                `px-4 py-2 rounded-md hover:bg-gray-700 transition ${
                  isActive ? "bg-gray-700" : ""
                }`
              }
              onClick={() => setOpen(false)}
            >
              {name}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Overlay for mobile sidebar */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-20 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
