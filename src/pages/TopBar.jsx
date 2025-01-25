import React from "react";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import "./TopBar.css";

const TopBar = () => {
    return (
        <header className="top-bar">
            <h2 className="app-title">Ecosphere</h2>
            <div className="search-bar">
                <FaSearch className="search-icon" />
                <input type="text" placeholder="Search..." />
            </div>
            <div className="profile-section">
                <FaUserCircle className="profile-icon" />
                <span className="profile-name">John Doe</span>
            </div>
        </header>
    );
};

export default TopBar;
