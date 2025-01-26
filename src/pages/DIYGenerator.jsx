import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./DIYGenerator.css";

const DIYGenerator = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [inputText, setInputText] = useState("");
    const [loading, setLoading] = useState(false);
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

    // Handle input text change
    const handleInputChange = (event) => {
        setInputText(event.target.value);
    };

    // Handle form submission (send data to backend)
    const handleSubmit = async () => {
        if (!selectedFile && !inputText) {
            alert("Please provide an image or type an item!");
            return;
        }
    
        const formData = new FormData();
        if (selectedFile) {
            formData.append("file", selectedFile);
        }
        if (inputText) {
            formData.append("text", inputText);
        }
    
        try {
            setLoading(true);
    
            const response = await axios.post("http://127.0.0.1:8000/scan-product/", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            console.log("Response received:", response.data);

            if (response.data && response.data.diy_ideas) {
                // Navigate to results page only if valid data is received
                navigate("/DIYResults", { state: { diyIdeas: response.data } });
            } else {
                alert("No valid DIY ideas received. Please try again.");
                console.error("Invalid response structure:", response.data);
            }
    
        } catch (error) {
            console.error("Error uploading file:", error);
            alert("Failed to generate DIY ideas. Please try again.");
        } finally {
            setLoading(false);
        }
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
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{ display: "none" }}
                    />
                </label>

                {/* Input Box */}
                <input
                    type="text"
                    className="message-input"
                    placeholder="Type your item or upload an image..."
                    value={inputText}
                    onChange={handleInputChange}
                />

                {/* Send Button */}
                <button className="send-button" onClick={handleSubmit} disabled={loading}>
                    {loading ? "Generating..." : "➤"}
                </button>
            </div>

            {/* Display Selected File */}
            {selectedFile && (
                <div className="file-preview">
                    <p>Selected File: {selectedFile.name}</p>
                </div>
            )}

            {/* Display loading status */}
            {loading && <p className="loading-message">Generating DIY ideas, please wait...</p>}
        </div>
    );
};

export default DIYGenerator;
