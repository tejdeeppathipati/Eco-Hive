import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const authToken = localStorage.getItem("authToken"); // Check if the token exists

    if (!authToken) {
        return <Navigate to="/signin" replace />; // Redirect to sign-in if not authenticated
    }

    return children; // Render the dashboard if authenticated
};

export default ProtectedRoute;
