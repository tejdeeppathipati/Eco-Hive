import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const authToken = localStorage.getItem("authToken"); // Check authentication state

    if (!authToken) {
        return <Navigate to="/" replace />; // Redirect to login if not authenticated
    }

    return children; // Render the protected component if authenticated
};

export default PrivateRoute;
