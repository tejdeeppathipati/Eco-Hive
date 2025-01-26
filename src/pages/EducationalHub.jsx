import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EducationalHub.css";

const EducationalHub = () => {
    const [resources] = useState([
        {
            title: "The Road to Sustainability: Why It Matters",
            description:
                "Explore how individuals and organizations can adopt sustainable practices to combat climate change.",
            link: "https://www.worldwildlife.org/stories/what-is-sustainability",
        },
        {
            title: "10 Simple Ways to Reduce Your Carbon Footprint",
            description:
                "Learn everyday actions to minimize environmental impact.",
            link: "https://www.nationalgeographic.com/environment/article/ways-to-reduce-carbon-footprint",
        },
        {
            title: "Sustainable Development Goals Explained",
            description:
                "Understand the UN's vision for a sustainable future.",
            link: "https://sdgs.un.org/goals",
        },
        {
            title: "Climate Crisis: Latest Updates on Global Efforts",
            description:
                "Stay informed about the latest policies and climate action plans.",
            link: "https://www.un.org/en/climatechange",
        },
        {
            title: "Green Technology: Innovations Changing the Planet",
            description:
                "Discover groundbreaking technologies aiding environmental sustainability.",
            link: "https://www.cnbc.com/green-technology/",
        },
        {
            title: "World's Largest Wind Farm Opens in the North Sea",
            description:
                "Read about one of the biggest steps toward renewable energy.",
            link: "https://www.bbc.com/news/uk-england-humber-60864849",
        },
        {
            title: "The Story of Stuff (20-Minute Video)",
            description:
                "A fun, fast-paced explanation of consumerism's impact on the environment.",
            link: "https://www.storyofstuff.org/movies/story-of-stuff/",
        },
        {
            title: "David Attenborough: A Life on Our Planet",
            description:
                "A must-watch documentary highlighting the need for conservation.",
            link: "https://www.netflix.com/title/80216393",
        },
        {
            title: "Reduce, Reuse, Recycle: A Sustainable Living Guide",
            description:
                "A practical guide to adopting eco-friendly habits.",
            link: "https://www.epa.gov/recycle/reducing-and-reusing-basics",
        },
    ]);

    const navigate = useNavigate();

    const handleBackToHome = () => {
        navigate("/dashboard");
    };

    return (
        <div className="educational-hub-container">
            <h1 className="hub-title">Educational Hub</h1>
            <div className="resources-grid">
                {resources.map((resource, index) => (
                    <div key={index} className="resource-card">
                        <h3 className="resource-title">{resource.title}</h3>
                        <p className="resource-description">{resource.description}</p>
                        <a
                            href={resource.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="read-more-link"
                        >
                            Read More
                        </a>
                    </div>
                ))}
            </div>

            {/* Floating Home Button */}
            <button className="floating-action-button" onClick={handleBackToHome}>
                🏠
            </button>
        </div>
    );
};

export default EducationalHub;
