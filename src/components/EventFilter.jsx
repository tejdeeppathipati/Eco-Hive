import React, { useState } from "react";

const EventFilter = ({ onFilter }) => {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");

    const handleSearch = (e) => {
        setSearch(e.target.value);
        onFilter(e.target.value, category);
    };

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
        onFilter(search, e.target.value);
    };

    return (
        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
            <input
                type="text"
                placeholder="Search events"
                value={search}
                onChange={handleSearch}
                style={{ padding: "10px", flex: 1, borderRadius: "5px", border: "1px solid #ddd" }}
            />
            <select
                value={category}
                onChange={handleCategoryChange}
                style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ddd" }}
            >
                <option value="">All Categories</option>
                <option value="Clean-Up">Clean-Up</option>
                <option value="Workshop">Workshop</option>
                <option value="Volunteer">Volunteer</option>
            </select>
        </div>
    );
};

export default EventFilter;
