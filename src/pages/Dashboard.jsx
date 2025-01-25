import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../components/TopBar"; // Import TopBar
import "./Dashboard.css";

const Dashboard = () => {
    const navigate = useNavigate();
    const [points, setPoints] = useState(0); // State to store points

    useEffect(() => {
        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
            navigate("/"); // Redirect to login if not authenticated
        }

        // Fetch points from localStorage or set default to 0
        const savedPoints = localStorage.getItem("points");
        setPoints(savedPoints ? parseInt(savedPoints, 10) : 0);
    }, [navigate]);

    const handleNavigation = (route) => {
        navigate(route); // Navigate to the specified route
    };

    return (
        <div className="dashboard">
            {/* Top Bar */}
            <TopBar />

            {/* Sidebar */}
            <aside className="sidebar">
                <h2 className="sidebar-title">Ecosphere</h2>
                <ul className="nav-list">
                    <li onClick={() => handleNavigation("/dashboard")}>
                        <span className="icon">🏠</span>
                        <span className="nav-link">Home</span>
                    </li>
                    <li onClick={() => handleNavigation("/ImpactMetrics")}>
                        <span className="icon">📊</span>
                        <span className="nav-link">Impact Metrics</span>
                    </li>
                    <li onClick={() => handleNavigation("/WasteClassification")}>
                        <span className="icon">♻️</span>
                        <span className="nav-link">Waste Classification</span>
                    </li>
                    <li onClick={() => handleNavigation("/DIYGenerator")}>
                        <span className="icon">🔧</span>
                        <span className="nav-link">DIY Projects</span>
                    </li>
                    <li onClick={() => handleNavigation("/EcoMissions")}>
                        <span className="icon">🌍</span>
                        <span className="nav-link">Eco Events</span>
                    </li>
                    <li onClick={() => handleNavigation("/Points")}>
                        <span className="icon">⭐</span>
                        <span className="nav-link">Points</span>
                    </li>
                </ul>
            </aside>

            {/* Main Content */}
            <main className="main-content">
                <h1 className="welcome-title">Welcome to Ecosphere!</h1>
                <p className="welcome-text">
                    Take a step toward sustainability. Explore tools and resources to make an impact.
                </p>

                <div className="card-grid">
                    <div
                        className="card"
                        onClick={() => handleNavigation("/ImpactMetrics")}
                    >
                        <h3>Impact Metrics</h3>
                        <p>Track community impact with charts and progress bars.</p>
                    </div>

                    <div
                        className="card"
                        onClick={() => handleNavigation("/WasteClassification")}
                    >
                        <h3>Waste Classification</h3>
                        <p>Identify recyclable and compostable items.</p>
                    </div>

                    <div
                        className="card"
                        onClick={() => handleNavigation("/DIYGenerator")}
                      >
                       <h3>DIY Projects</h3>
                        <p>Discover creative reuse ideas and track your projects.</p>
                    </div>

                    <div
                        className="card"
                        onClick={() => handleNavigation("/EcoMissions")}
                    >
                        <h3>Eco Missions</h3>
                        <p>Participate in eco-friendly missions and earn points.</p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;