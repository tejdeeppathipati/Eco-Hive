import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DIYGenerator.css";

const DIYGenerator = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const navigate = useNavigate();

    // Handle file selection
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith("image/")) {
            setSelectedFile(file);
            alert(`File "${file.name}" uploaded successfully!`);
        } else {
            alert("Please upload a valid image file.");
        }
    };

    // Handle floating action button click
    const handleBackToHome = () => {
        navigate("/dashboard");
    };

    return (
        <div className="diy-generator-container">
            <h1 className="header-title">Scan Anything... Get Creative DIY Ideas!</h1>
            <div className="input-container">
                {/* Attach Button */}
                <label className="attach-button">
                    📎
                    <input
                        type="file"
                        accept="image/*" // Allow any image type
                        onChange={handleFileChange}
                        style={{ display: "none" }}
                    />
                </label>

                {/* Input Box */}
                <input
                    type="text"
                    className="message-input"
                    placeholder="Type your item or upload an image..."
                />

                {/* Send Button */}
                <button className="send-button">➤</button>
            </div>

            {/* Display Selected File */}
            {selectedFile && (
                <div className="file-preview">
                    <p>Selected File: {selectedFile.name}</p>
                </div>
            )}

            {/* Floating Action Button */}
            <button className="floating-action-button" onClick={handleBackToHome}>
                🏠
            </button>
        </div>
    );
};

export default DIYGenerator;
