import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import {
    fetchGoalsRealTime,
    fetchFriendsAndFamilyRealTime,
    addWeeklyGoal,
    updateGoalProgress,
    fetchUserByEmail,
    addFriendOrFamily,
    shareGoalWithUser,
    deleteGoal,
} from "../services/firestoreHelpers";
import "./ImpactMetrics.css";
import { useNavigate } from "react-router-dom";

const ImpactMetrics = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [goals, setGoals] = useState([]);
    const [friendsAndFamily, setFriendsAndFamily] = useState([]);
    const [newGoal, setNewGoal] = useState("");
    const [email, setEmail] = useState("");
    const [relationship, setRelationship] = useState("Friend");

    useEffect(() => {
        if (user) {
            fetchGoalsRealTime(user.uid, setGoals);
            fetchFriendsAndFamilyRealTime(user.uid, setFriendsAndFamily);
        }
    }, [user]);

    const handleAddGoal = () => {
        if (newGoal.trim()) {
            addWeeklyGoal(user.uid, newGoal).then(() => setNewGoal(""));
        }
    };

    const handleAddFriendOrFamily = async () => {
        if (!email.trim()) {
            alert("Please enter an email.");
            return;
        }
        try {
            const friendData = await fetchUserByEmail(email);
            await addFriendOrFamily(user.uid, friendData.id, `${friendData.firstName} ${friendData.lastName}`, relationship);
            setEmail("");
            alert(`${friendData.firstName} ${friendData.lastName} added successfully!`);
        } catch (error) {
            alert(error.message);
        }
    };

    const handleShareGoal = async (goalId, shareOption) => {
        const selectedFriends = friendsAndFamily.filter((person) =>
            shareOption === "Friends"
                ? person.relationship === "Friend"
                : shareOption === "Family"
                ? person.relationship === "Family"
                : shareOption === "Friends and Family"
                ? true
                : []
        );

        try {
            for (const person of selectedFriends) {
                await shareGoalWithUser(user.uid, goalId, person.id);
            }
            alert(`Goal shared successfully with ${shareOption}`);
        } catch (error) {
            alert(error.message);
        }
    };

    const handleDeleteGoal = async (goalId) => {
        try {
            await deleteGoal(user.uid, goalId);
            setGoals((prevGoals) => prevGoals.filter((goal) => goal.id !== goalId));
            alert("Goal completed and removed successfully!");
        } catch (error) {
            alert("Error removing goal: " + error.message);
        }
    };

    return (
        <div className="impact-metrics-container">
            <h1 className="title">This Week's Goals</h1>
            <div className="goals-container">
                {/* Your Goals */}
                <div className="your-goals">
                    <h2>Your Goals</h2>
                    <div className="horizontal-scroll">
                        {goals.map((goal) => (
                            <div key={goal.id} className="goal-card">
                                <h3>{goal.name}</h3>
                                <div className="progress-container">
                                    <div
                                        className="progress-bar"
                                        style={{ width: `${(goal.progress / goal.target) * 100}%` }}
                                    ></div>
                                </div>
                                <div className="button-container">
                                    <button
                                        className="small-button"
                                        onClick={() => updateGoalProgress(user.uid, goal.id, goal.progress + 1)}
                                    >
                                        Update Progress
                                    </button>
                                    <button
                                        className="small-button"
                                        onClick={() => handleDeleteGoal(goal.id)}
                                    >
                                        Complete
                                    </button>
                                </div>
                                <div>
                                    <label>Share With:</label>
                                    <select onChange={(e) => handleShareGoal(goal.id, e.target.value)}>
                                        <option value="None">None</option>
                                        <option value="Friends">Friends</option>
                                        <option value="Family">Family</option>
                                        <option value="Friends and Family">Friends and Family</option>
                                    </select>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="add-goal-form">
                        <input
                            type="text"
                            placeholder="Add a new goal..."
                            value={newGoal}
                            onChange={(e) => setNewGoal(e.target.value)}
                        />
                        <button onClick={handleAddGoal}>Add Goal</button>
                    </div>
                </div>

                {/* Friends' and Family's Goals */}
                <div className="friends-goals">
                    <h2>Friends' and Family's Goals</h2>
                    <div className="horizontal-scroll">
                        {friendsAndFamily.map((friend) =>
                            friend.goals && friend.goals.length ? (
                                friend.goals.map((goal, idx) => (
                                    <div key={`${friend.id}-${idx}`} className="goal-card">
                                        <h3>{goal.name}</h3>
                                        <div className="progress-container">
                                            <div
                                                className="progress-bar"
                                                style={{
                                                    width: `${(goal.progress / goal.target) * 100}%`,
                                                }}
                                            ></div>
                                        </div>
                                        <p>Added by: {friend.name}</p>
                                    </div>
                                ))
                            ) : (
                                <p key={friend.id}>{friend.name} has no goals yet.</p>
                            )
                        )}
                    </div>
                </div>
            </div>

            {/* Add Friends or Family Section */}
            <div className="add-friends-section">
                <h2>Add Friends or Family</h2>
                <div className="add-friend-form">
                    <input
                        type="email"
                        placeholder="Enter email..."
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <select value={relationship} onChange={(e) => setRelationship(e.target.value)}>
                        <option value="Friend">Friend</option>
                        <option value="Family">Family</option>
                    </select>
                    <button onClick={handleAddFriendOrFamily}>Add</button>
                </div>
            </div>

            {/* Floating Home Button */}
            <button className="floating-action-button" onClick={() => navigate("/dashboard")}>
                🏠
            </button>
        </div>
    );
};

export default ImpactMetrics;
