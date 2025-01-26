import React, { useState, useEffect } from "react";
import "./Points.css";

const rewardsData = [
    { id: 1, name: "Free Coffee", category: "Food", points: 100, image: "/images/coffee.jpeg" },
    { id: 2, name: "Movie Ticket", category: "Entertainment", points: 300, image: "/images/movie.jpeg" },
    { id: 3, name: "Audible", category: "Subscriptions", points: 500, image: "/images/sub.jpeg" },
    { id: 4, name: "Six Flags", category: "Entertainment", points: 800, image: "/images/park.jpeg" },
];

const Points = () => {
    const [userPoints, setUserPoints] = useState(2000); // Example user points
    const [filteredRewards, setFilteredRewards] = useState(rewardsData);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    const totalPoints = 10000; // Maximum points for the circular tracker

    // Calculate user's tier
    const getUserTier = () => {
        if (userPoints >= 5000) return "Platinum";
        if (userPoints >= 3000) return "Gold";
        if (userPoints >= 1000) return "Silver";
        return "Bronze";
    };

    const userTier = getUserTier(); // Get the user's current tier

    useEffect(() => {
        const filtered = rewardsData.filter((reward) => {
            return (
                (searchQuery === "" || reward.name.toLowerCase().includes(searchQuery.toLowerCase())) &&
                (selectedCategory === "All" || reward.category === selectedCategory)
            );
        });
        setFilteredRewards(filtered);
    }, [searchQuery, selectedCategory]);

    const handleRedeem = (reward) => {
        if (userPoints >= reward.points) {
            setUserPoints(userPoints - reward.points);
            alert(`You redeemed ${reward.name}!`);
        } else {
            alert("You don't have enough points to redeem this reward.");
        }
    };

    const calculateStrokeDashOffset = () => {
        const percentage = (userPoints / totalPoints) * 100;
        return 440 - (440 * percentage) / 100; // 440 is the circumference of the circle
    };

    return (
        <div className="points-page">
            <header className="points-header">
                <h1>🌟Redeem Your Rewards🌟</h1>
                <p>Track your points and unlock amazing rewards!</p>
            </header>

            <div className="points-tracker-container">
                <div className="points-tracker">
                    <svg className="circle-svg" width="150" height="150" viewBox="0 0 150 150">
                        <circle
                            cx="75"
                            cy="75"
                            r="70"
                            stroke="#ddd"
                            strokeWidth="10"
                            fill="none"
                        />
                        <circle
                            cx="75"
                            cy="75"
                            r="70"
                            stroke="#3b7a57"
                            strokeWidth="10"
                            fill="none"
                            strokeDasharray="440"
                            strokeDashoffset={calculateStrokeDashOffset()}
                            strokeLinecap="round"
                        />
                    </svg>
                    <div className="points-label">
                        <span>{userPoints}</span>
                        <small>of {totalPoints}</small>
                    </div>
                </div>
            </div>

            {/* Tier Display */}
            <div className="tier-display">
                <h2>Tier: <span className={`tier-${userTier.toLowerCase()}`}>{userTier}</span></h2>
            </div>

            <div className="points-filters">
                <input
                    type="text"
                    placeholder="Search rewards..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                    <option value="All">All Categories</option>
                    <option value="Food">Food</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Subscriptions">Subscriptions</option>
                </select>
            </div>

            <div className="points-catalog">
                {filteredRewards.length > 0 ? (
                    filteredRewards.map((reward) => (
                        <div key={reward.id} className="reward-card">
                            <img src={reward.image} alt={reward.name} />
                            <h3>{reward.name}</h3>
                            <p>Points Required: {reward.points}</p>
                            <button onClick={() => handleRedeem(reward)}>Redeem</button>
                        </div>
                    ))
                ) : (
                    <p>No rewards found.</p>
                )}
            </div>
        </div>
    );
};

export default Points;
