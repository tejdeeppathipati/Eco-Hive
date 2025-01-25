import React, { useState, useEffect } from "react";
import EventCard from "../components/EventCard";
import "./EcoMissions.css";

const EcoMissions = () => {
    const [events, setEvents] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [showAddEventForm, setShowAddEventForm] = useState(false);
    const [newEvent, setNewEvent] = useState({
        name: "",
        date: "",
        time: "",
        location: "",
        tags: "",
        image: "",
    });

    useEffect(() => {
        const sampleEvents = [
            {
                id: 1,
                name: "Beach Cleanup",
                date: "2025-01-30",
                time: "9:00 AM - 12:00 PM",
                location: "Oceanfront",
                tags: ["Clean-Up", "Community"],
                image: "/images/beachcleanup.jpg",
            },
            {
                id: 2,
                name: "Tree Planting Drive",
                date: "2025-02-05",
                time: "10:00 AM - 2:00 PM",
                location: "Central Park",
                tags: ["Environment", "Volunteer"],
                image: "/images/plant.jpeg",
            },
        ];
        setEvents(sampleEvents);
    }, []);

    const filteredEvents = events.filter((event) => {
        const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === "All" || event.tags.includes(selectedCategory);
        return matchesSearch && matchesCategory;
    });

    const handleAddEventToggle = () => {
        setShowAddEventForm((prev) => !prev);
    };

    const handleAddEventChange = (e) => {
        const { name, value } = e.target;
        setNewEvent((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddEventSubmit = (e) => {
        e.preventDefault();
        if (!newEvent.name || !newEvent.date || !newEvent.time || !newEvent.location) {
            alert("Please fill in all required fields.");
            return;
        }
        const tagsArray = newEvent.tags.split(",").map((tag) => tag.trim());
        const eventToAdd = { ...newEvent, tags: tagsArray, id: events.length + 1 };
        setEvents((prev) => [...prev, eventToAdd]);
        setNewEvent({ name: "", date: "", time: "", location: "", tags: "", image: "" });
        setShowAddEventForm(false);
    };

    return (
        <div className="eco-missions-container">
            <h1>Eco Missions</h1>
            <p>Discover and participate in sustainability events near you.</p>
            <div className="header-actions">
                <button className="add-event-button" onClick={handleAddEventToggle}>
                    {showAddEventForm ? "Cancel" : "Host an Event"}
                </button>
            </div>
            {showAddEventForm && (
                <form className="add-event-form" onSubmit={handleAddEventSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Event Name"
                        value={newEvent.name}
                        onChange={handleAddEventChange}
                        required
                    />
                    <input
                        type="date"
                        name="date"
                        value={newEvent.date}
                        onChange={handleAddEventChange}
                        required
                    />
                    <input
                        type="text"
                        name="time"
                        placeholder="Event Time"
                        value={newEvent.time}
                        onChange={handleAddEventChange}
                        required
                    />
                    <input
                        type="text"
                        name="location"
                        placeholder="Location"
                        value={newEvent.location}
                        onChange={handleAddEventChange}
                        required
                    />
                    <input
                        type="text"
                        name="tags"
                        placeholder="Tags (comma separated)"
                        value={newEvent.tags}
                        onChange={handleAddEventChange}
                    />
                    <input
                        type="text"
                        name="image"
                        placeholder="Image URL (optional)"
                        value={newEvent.image}
                        onChange={handleAddEventChange}
                    />
                    <button type="submit" className="submit-event-button">
                        Add Event
                    </button>
                </form>
            )}
            <div className="filters">
                <input
                    type="text"
                    placeholder="Search events"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-bar"
                />
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="category-filter"
                >
                    <option value="All">All Categories</option>
                    <option value="Clean-Up">Clean-Up</option>
                    <option value="Community">Community</option>
                    <option value="Environment">Environment</option>
                    <option value="Volunteer">Volunteer</option>
                </select>
            </div>
            <div className="event-list">
                {filteredEvents.length > 0 ? (
                    filteredEvents.map((event) => <EventCard key={event.id} event={event} />)
                ) : (
                    <p>No events found.</p>
                )}
            </div>
        </div>
    );
};

export default EcoMissions;
