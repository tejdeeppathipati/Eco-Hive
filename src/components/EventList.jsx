import React from "react";
import EventCard from "./EventCard";

const EventList = ({ events }) => {
    return (
        <div>
            {events.length > 0 ? (
                events.map((event) => <EventCard key={event.id} event={event} />)
            ) : (
                <p>No events found.</p>
            )}
        </div>
    );
};

export default EventList;
