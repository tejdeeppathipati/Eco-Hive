import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./DIYResults.css";

const DIYResults = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const diyIdeas = location.state?.diyIdeas || null;

    // State to force image refresh by updating query string
    const [imageKey] = useState(Date.now());

    if (!diyIdeas || !diyIdeas.diy_ideas || !diyIdeas.images) {
        return <p className="no-data-message">No data available. Please go back and upload an image.</p>;
    }

    return (
        <div className="diy-results-container">
            <h1 className="results-header">Your DIY Project Ideas</h1>

            <div className="projects-grid">
                {diyIdeas.diy_ideas.DIYProjects.map((project, index) => {
                    const imageUrl = `http://127.0.0.1:8000/${diyIdeas.images[project.level.toLowerCase()]}?t=${imageKey}`;

                    return (
                        <div key={index} className="project-card">
                            <h2>{project.level} Project</h2>
                            <img
                                src={imageUrl}
                                alt={`${project.level} DIY`}
                                className="project-image"
                                onError={(e) => e.target.src = "/placeholder-image.png"}
                            />

                            <h3><strong>Description:</strong> {project.productDescription}</h3>
                            <p><strong>Estimated Time:</strong> {project.estimatedCompletionTime}</p>

                            <h4>Materials Required:</h4>
                            <ul>
                                {project.requiredMaterials.map((material, idx) => (
                                    <li key={idx}>{material.material} - {material.quantity}</li>
                                ))}
                            </ul>

                            <h4>Steps:</h4>
                            <ol>
                                {project.stepByStepInstructions.map((step, idx) => (
                                    <li key={idx}>
                                        {step.stepNumber}. {step.description} (⏳ {step.estimatedTime})
                                    </li>
                                ))}
                            </ol>

                            <h4>Safety Precautions:</h4>
                            <ul>
                                {project.safetyTips.map((tip, idx) => (
                                    <li key={idx}>⚠ {tip}</li>
                                ))}
                            </ul>

                            <h4>Difficulty: {project.difficultyLevel}</h4>
                            <p>{project.difficultyExplanation}</p>
                        </div>
                    );
                })}
            </div>

            <button 
                className="back-button"
                onClick={() => {
                    if (window.history.length > 1) {
                        navigate(-1);
                    } else {
                        navigate("/DIYGenerator");
                    }
                }}
            >
                🔙 Back
            </button>
        </div>
    );
};

export default DIYResults;
