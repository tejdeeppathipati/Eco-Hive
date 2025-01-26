import React, { useState } from "react";
import "./EventCard.css";

const EventCard = ({ event }) => {
    const [isRegistered, setIsRegistered] = useState(false);

    const handleRSVP = () => {
        setIsRegistered(true);
        alert("Registered. You will receive an email confirmation shortly.");
        // Add email confirmation logic here if integrated with backend
    };

    return (
        <div className="event-card">
            {/* Image Section */}
            <div className="event-image-container">
                <img
                    src={event.image || "/placeholder.jpg"}
                    alt={event.name}
                    className="event-image"
                />
            </div>

            {/* Event Details Section */}
            <div className="event-details-container">
                <h3 className="event-title">{event.name}</h3>
                <p><strong>Date:</strong> {event.date}</p>
                <p><strong>Time:</strong> {event.time}</p>
                <p><strong>Location:</strong> {event.location}</p>
                <p><strong>Description:</strong> {event.description || "N/A"}</p>
                <div className="rsvp-container">
                    <button
                        className={`rsvp-button ${isRegistered ? "registered" : ""}`}
                        onClick={handleRSVP}
                        disabled={isRegistered}
                    >
                        {isRegistered ? "Registered" : "RSVP"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EventCard;
