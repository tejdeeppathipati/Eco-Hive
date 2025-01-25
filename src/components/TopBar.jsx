import React, { useEffect, useState } from "react";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import "./TopBar.css";

const TopBar = () => {
    const { user } = useAuth(); // Access user from AuthContext
    const [userName, setUserName] = useState("");

    useEffect(() => {
        if (user) {
            // Assume `displayName` is stored in Firebase Auth profile
            setUserName(user.displayName || "Guest");
        }
    }, [user]);

    return (
        <header className="top-bar">
            <h2 className="app-title">Ecosphere</h2>
            <div className="top-bar-right">
                <div className="search-bar">
                    <FaSearch className="search-icon" />
                    <input type="text" placeholder="Search..." />
                </div>
                <div className="profile-section">
                    <FaUserCircle className="profile-icon" />
                    <span className="profile-name">{userName}</span>
                </div>
            </div>
        </header>
    );
};

export default TopBar;
