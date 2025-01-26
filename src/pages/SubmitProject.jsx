import React, { useState } from "react";
import "./SubmitProject.css";
import { db } from "../firebase/firebase"; // Ensure Firebase is configured
import { addDoc, collection, updateDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import axios from "axios"; // Used to call an AI image analysis API

const SubmitProject = () => {
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState("");
    const [feedback, setFeedback] = useState("");
    const [pointsEarned, setPointsEarned] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const user = getAuth().currentUser;

    // Handle file selection
    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!image || !description) {
            alert("Please upload an image and provide a description.");
            return;
        }

        setIsSubmitting(true);
        try {
            // Upload image to a cloud storage or analyze locally
            const formData = new FormData();
            formData.append("file", image);

            // Simulated image analysis with AI (replace this URL with your actual AI API endpoint)
            const response = await axios.post("https://api.example.com/analyze-image", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            const aiFeedback = response.data.feedback; // AI-generated feedback
            const aiPoints = response.data.points; // AI-calculated points

            // Update state with feedback and points
            setFeedback(aiFeedback);
            setPointsEarned(aiPoints);

            // Store project and points in Firebase
            const userRef = doc(db, "users", user.uid);
            const projectsRef = collection(db, "projects");
            await addDoc(projectsRef, {
                userId: user.uid,
                description,
                imageUrl: "https://your-storage-url.com/" + image.name, // Replace with actual image URL
                feedback: aiFeedback,
                points: aiPoints,
                timestamp: new Date(),
            });

            // Update user's total points in Firebase
            await updateDoc(userRef, {
                totalPoints: (user.totalPoints || 0) + aiPoints,
            });
        } catch (error) {
            console.error("Error submitting project:", error);
            alert("An error occurred while submitting your project.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="submit-project-container">
            <h1 className="title">Submit Your Project</h1>
            <form onSubmit={handleSubmit} className="submit-project-form">
                <label htmlFor="file-upload">Upload a Picture of Your Project</label>
                <input type="file" id="file-upload" accept="image/*" onChange={handleFileChange} />
                <label htmlFor="project-description">Project Description</label>
                <textarea
                    id="project-description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows="4"
                ></textarea>
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit"}
                </button>
            </form>

            {feedback && (
                <div className="feedback-container">
                    <h2>Feedback</h2>
                    <p>{feedback}</p>
                    <p>
                        <strong>Points Earned:</strong> {pointsEarned}
                    </p>
                </div>
            )}
        </div>
    );
};

export default SubmitProject;
