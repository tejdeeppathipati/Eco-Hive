import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EventCard from "../components/EventCard";
import "./EcoMissions.css";
import { db } from "../firebase/firebase";
import { collection, onSnapshot, addDoc } from "firebase/firestore";

const EcoMissions = () => {
    const [events, setEvents] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    const [showHostForm, setShowHostForm] = useState(false);
    const [newEvent, setNewEvent] = useState({
        name: "",
        date: "",
        time: "",
        location: "",
        description: "",
        image: "",
    });

    // Fetch real-time events from Firebase
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "events"), (snapshot) => {
            const fetchedEvents = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setEvents(fetchedEvents);
        });

        return () => unsubscribe();
    }, []);

    // Add new event to Firebase
    const handleAddEvent = async () => {
        if (!newEvent.name || !newEvent.date || !newEvent.time || !newEvent.location || !newEvent.image) {
            alert("Please fill in all required fields.");
            return;
        }

        try {
            await addDoc(collection(db, "events"), {
                ...newEvent,
            });
            alert("Event added successfully!");
            setNewEvent({
                name: "",
                date: "",
                time: "",
                location: "",
                description: "",
                image: "",
            });
            setShowHostForm(false); // Hide form after submission
        } catch (error) {
            console.error("Error adding event: ", error);
        }
    };

    // Filter events
    const filteredEvents = events.filter((event) =>
        event.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Handle navigation to home
    const handleBackToHome = () => {
        navigate("/dashboard");
    };

    return (
        <div className="eco-missions-container">
            {/* Header Section */}
            <div className="header">
                <h1>Welcome to EcoMissions</h1>
                <input
                    type="text"
                    className="search-bar"
                    placeholder="Search events"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Host an Event Section */}
            <button
                className="host-event-button"
                onClick={() => setShowHostForm(!showHostForm)}
            >
                {showHostForm ? "Cancel" : "Host an Event"}
            </button>

            {showHostForm && (
                <div className="host-event-form">
                    <h2>Host an Event</h2>
                    <input
                        type="text"
                        placeholder="Event Name"
                        value={newEvent.name}
                        onChange={(e) =>
                            setNewEvent({ ...newEvent, name: e.target.value })
                        }
                    />
                    <input
                        type="date"
                        value={newEvent.date}
                        onChange={(e) =>
                            setNewEvent({ ...newEvent, date: e.target.value })
                        }
                    />
                    <input
                        type="text"
                        placeholder="Time"
                        value={newEvent.time}
                        onChange={(e) =>
                            setNewEvent({ ...newEvent, time: e.target.value })
                        }
                    />
                    <input
                        type="text"
                        placeholder="Location"
                        value={newEvent.location}
                        onChange={(e) =>
                            setNewEvent({ ...newEvent, location: e.target.value })
                        }
                    />
                    <textarea
                        placeholder="Description"
                        value={newEvent.description}
                        onChange={(e) =>
                            setNewEvent({ ...newEvent, description: e.target.value })
                        }
                        rows="4"
                        style={{ resize: "none" }}
                    ></textarea>
                    <input
                        type="text"
                        placeholder="Image URL"
                        value={newEvent.image}
                        onChange={(e) =>
                            setNewEvent({ ...newEvent, image: e.target.value })
                        }
                    />
                    <button onClick={handleAddEvent}>Add Event</button>
                </div>
            )}

            {/* Events Section */}
            <div className="events-section">
                <h2>Upcoming Events</h2>
                <div className="event-list">
                    {filteredEvents.length > 0 ? (
                        filteredEvents.map((event) => (
                            <EventCard key={event.id} event={event} />
                        ))
                    ) : (
                        <p>No events found.</p>
                    )}
                </div>
            </div>

            {/* Floating Action Button */}
            <button className="floating-action-button" onClick={handleBackToHome}>
                🏠
            </button>
        </div>
    );
};

export default EcoMissions;