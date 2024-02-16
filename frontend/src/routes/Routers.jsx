import React from "react";
import Home from "../pages/Home";
import Contact from "../pages/Contact";
import Signup from "../pages/Signup";
import Services from "../pages/Services";
import Login from "../pages/Login";
import DoctorDetails from "../pages/Doctors/DoctorDetails";
import Doctors from "../pages/Doctors/Doctors";
import { Routes, Route } from "react-router-dom";
import MyAccount from "../Dashboard/UserAccount/MyAccount";
import Dashboard from "../Dashboard/DoctorAccount/Dashboard";
import ProtectedRoute from "./ProtectedRoute";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/service" element={<Services />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/doctors" element={<Doctors />} />
      <Route
        path="/doctors/profile/me"
        element={
          <ProtectedRoute allowedRoles={["doctor"]}>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/users/profile/me"
        element={
          <ProtectedRoute allowedRoles={["patient"]}>
            <MyAccount />
          </ProtectedRoute>
        }
      />
      <Route path="/doctors/:id" element={<DoctorDetails />} />
    </Routes>
  );
};

export default Routers;
