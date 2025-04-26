"use client";

import React, { useState } from "react";
import { ImCart } from "react-icons/im";
import { BiSolidUser } from "react-icons/bi";
import { LuMenu, LuX } from "react-icons/lu";
import { FaHome } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import Product from "./components/product/product";
import Report from "./components/reports/report";

export default function Dashboard() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeView, setActiveView] = useState("Home");

  const handleLogout = () => {
    console.log("Logging out...");
  };
  return (
    <div className="w-full flex flex-col relative min-h-screen">
      {/* Header */}
      <header className="w-full flex items-center justify-between p-5 lg:px-10 border-b-2 border-gray-200 bg-white shadow-sm">
        {/* Logo */}
        <div className="flex items-center gap-2 text-xl font-semibold text-gray-800">
          <ImCart />
          <span className="hidden lg:inline">e-commerce</span>
        </div>

        {/* User Info & Actions */}
        <div className="flex items-center gap-4 text-xl text-gray-700">
          <div className="flex items-center gap-2">
            <BiSolidUser />
            <span className="hidden sm:inline text-base">Admin</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 text-sm text-red-600 hover:text-red-800 transition"
          >
            <FiLogOut />
            <span className="hidden sm:inline">Logout</span>
          </button>

          {/* Mobile Menu Icon */}
          <LuMenu
            className="block lg:hidden cursor-pointer text-2xl"
            onClick={() => setMenuOpen(true)}
          />
        </div>
      </header>

      {/* Main Layout for Large Devices */}
      <div className="flex flex-1">
        {/* Sidebar for Large Devices */}
        <aside className="hidden lg:block w-64 border-r border-gray-200">
          <div className="p-10 flex flex-col gap-4">
            <a
              href="#"
              className={`flex items-center gap-2 font-medium ${
                activeView === "Home"
                  ? "rounded-md text-violet-600 font-bold"
                  : ""
              }`}
              onClick={(e) => {
                e.preventDefault();
                setActiveView("Home");
              }}
            >
              <FaHome />
              Home
            </a>
            <a
              href="#"
              className={`flex items-center gap-2 font-medium ${
                activeView === "Products"
                  ? "rounded-md text-violet-600 font-bold"
                  : ""
              }`}
              onClick={(e) => {
                e.preventDefault();
                setActiveView("Products");
              }}
            >
              <AiFillProduct />
              Products
            </a>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-5 lg:p-10">
          <div className="h-full w-full">
            {activeView === "Home" && <Report />}
            {activeView === "Products" && <Product />}
          </div>
        </main>
      </div>

      {/* Sidebar for Mobile */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-white z-50 transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } lg:hidden`}
      >
        <div className="p-4 flex flex-col gap-4 h-full">
          <button
            className="self-end text-2xl"
            onClick={() => setMenuOpen(false)}
          >
            <LuX />
          </button>
          <a
            href="#"
            className={`flex items-center gap-2 font-medium ${
              activeView === "Home"
                ? "rounded-md text-violet-600 font-bold"
                : ""
            }`}
            onClick={(e) => {
              e.preventDefault();
              setActiveView("Home");
              setMenuOpen(false);
            }}
          >
            <FaHome />
            Home
          </a>
          <a
            href="#"
            className={`flex items-center gap-2 font-medium ${
              activeView === "Products"
                ? "rounded-md text-violet-600 font-bold"
                : ""
            }`}
            onClick={(e) => {
              e.preventDefault();
              setActiveView("Products");
              setMenuOpen(false);
            }}
          >
            <AiFillProduct />
            Products
          </a>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </div>
  );
}
