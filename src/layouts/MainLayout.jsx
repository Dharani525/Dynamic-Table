// src/layouts/MainLayout.jsx
import React from "react";
import Sidebar from "../components/Sidebar";

export default function MainLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-0 lg:ml-64 p-6 w-full bg-gray-100 min-h-screen">
        {children}
      </main>
    </div>
  );
}
