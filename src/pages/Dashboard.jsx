import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../components/TopBar"; // Import TopBar
import "./Dashboard.css";

const Dashboard = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
            navigate("/"); // Redirect to login if not authenticated
        }
    }, [navigate]);

    const handleNavigation = (route) => {
        navigate(route); // Navigate to the specified route
    };

    return (
        <div className="dashboard">
            {/* Top Bar */}
            <TopBar />

            {/* Main Content */}
            <main className="main-content">
                <h1 className="welcome-title">Welcome to EcoHive!</h1>
                <p className="welcome-text">
                    Take a step toward sustainability. Explore tools and resources to make an impact.
                </p>

                <div className="card-grid">
                    <div
                        className="card"
                        onClick={() => handleNavigation("/EcoMissions")}
                    >
                        <h3>Eco Missions</h3>
                        <p>Participate in eco-friendly missions and earn points.</p>
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
                        onClick={() => handleNavigation("/EducationalHub")}
                    >
                        <h3>Educational Hub</h3>
                        <p>Identify recyclable and compostable items.</p>
                    </div>

                    <div
                        className="card"
                        onClick={() => handleNavigation("/ImpactMetrics")}
                    >
                        <h3>Impact Metrics</h3>
                        <p>Track community impact with charts and progress bars.</p>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default Dashboard;
