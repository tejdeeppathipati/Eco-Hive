import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./TopBar.css";

const TopBar = () => {
    const [user, setUser] = useState(null);
    const [profileDropdown, setProfileDropdown] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe();
    }, []);

    const toggleDropdown = () => {
        setProfileDropdown((prev) => !prev);
    };

    const handleLogout = () => {
        const auth = getAuth();
        signOut(auth)
            .then(() => {
                navigate("/"); // Redirect to login page
            })
            .catch((error) => console.error("Logout error:", error));
    };

    const handleRewardsClick = () => {
        navigate("/points"); // Navigate to the Points.jsx page
    };

    return (
        <header className="top-bar">
            <h2 className="app-title">EcoHive</h2>
            <div className="top-bar-right">
                <button className="rewards-box" onClick={handleRewardsClick}>
                    My Rewards
                </button>
                {user && (
                    <div className="profile-section" onClick={toggleDropdown}>
                        <FaUserCircle className="profile-icon" />
                        <span className="profile-name">{user.displayName || "Guest"}</span>
                        {profileDropdown && (
                            <div className="profile-dropdown">
                                <p><strong>Name:</strong> {user.displayName || "Guest"}</p>
                                <p><strong>Email:</strong> {user.email || "N/A"}</p>
                                <button className="logout-button" onClick={handleLogout}>
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </header>
    );
};

export default TopBar;
