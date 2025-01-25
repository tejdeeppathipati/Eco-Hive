import React from "react";
import "./EventCard.css";

const EventCard = ({ event }) => {
    return (
        <div className="event-card">
            {event.image && (
                <img
                    src={event.image}
                    alt={event.name}
                    className="event-card-image"
                />
            )}
            <h3>{event.name}</h3>
            <p>
                <strong>Date:</strong> {event.date}
            </p>
            <p>
                <strong>Time:</strong> {event.time}
            </p>
            <p>
                <strong>Location:</strong> {event.location}
            </p>
            <div>
                {event.tags.map((tag, index) => (
                    <span key={index} className="event-tag">
                        {tag}
                    </span>
                ))}
            </div>
            <button className="rsvp-button">RSVP</button>
        </div>
    );
};

export default EventCard;
