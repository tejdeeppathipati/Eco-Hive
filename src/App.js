import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ImpactMetrics from "./pages/ImpactMetrics";
import WasteClassification from "./pages/WasteClassification";
import DIYGenerator from "./pages/DIYGenerator";
import EcoMissions from "./pages/EcoMissions"; // Ensure this is imported only once
import EventDetails from "./pages/EventDetails"; // Add EventDetails import
import Points from "./pages/Points";

import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />

                    {/* Private Routes */}
                    <Route
                        path="/dashboard"
                        element={
                            <PrivateRoute>
                                <Dashboard />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/ImpactMetrics"
                        element={
                            <PrivateRoute>
                                <ImpactMetrics />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/WasteClassification"
                        element={
                            <PrivateRoute>
                                <WasteClassification />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/DIYGenerator"
                        element={
                            <PrivateRoute>
                                <DIYGenerator />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/EcoMissions"
                        element={
                            <PrivateRoute>
                                <EcoMissions />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/Points"
                        element={
                            <PrivateRoute>
                                <Points />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/event/:id"
                        element={
                            <PrivateRoute>
                                <EventDetails />
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
