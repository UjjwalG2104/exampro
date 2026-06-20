import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, role }) {

    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role");


    // Not logged in
    if (!token) {

        return <Navigate to="/login" />;
    }


    // Role not allowed
    if (role && userRole !== role) {

        return <Navigate to="/login" />;
    }


    // Access granted
    return children;
}


export default ProtectedRoute;