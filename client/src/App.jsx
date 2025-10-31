import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/login";
import Register from "../pages/register";
import Dashboard from "../pages/dashboard";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/user/login" element={<Login />} />
        <Route path="/user/signup" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}
