import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./EventDetails.css";

const EventDetails = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { eventData } = state || {};

    if (!eventData) {
        return (
            <div className="event-details">
                <h2>No Event Data Available</h2>
                <button onClick={() => navigate("/EcoMissions")}>
                    Back to Eco Missions
                </button>
            </div>
        );
    }

    return (
        <div className="event-details">
            <img
                src={eventData.image}
                alt={eventData.name}
                className="event-details-image"
            />
            <h1>{eventData.name}</h1>
            <p>
                <strong>Date:</strong> {eventData.date}
            </p>
            <p>
                <strong>Time:</strong> {eventData.time}
            </p>
            <p>
                <strong>Location:</strong> {eventData.location}
            </p>
            <p>
                <strong>Description:</strong> {eventData.description}
            </p>
            <button onClick={() => navigate("/EcoMissions")}>
                Back to Eco Missions
            </button>
        </div>
    );
};

export default EventDetails;
