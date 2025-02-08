import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

const Static = () => {
    const [token] = useState(Cookies.get("token"));
    const [voices, setVoices] = useState([]);
    const [stories, setStories] = useState([]);

    useEffect(() => {
        const fetchVoices = async () => {
            try {
                const res = await fetch(`http://localhost:3001/api/getVoice`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                });

                if (!res.ok) {
                    throw new Error(`error: ${res.status}`);
                }

                const data = await res.json();
                setVoices(data.voices || []);
            } catch (err) {
                console.error("error", err);
            }
        };

        fetchVoices();
    }, [token]);

    useEffect(() => {
        const fetchStories = async () => {
            try {
                const res = await fetch(`http://localhost:3001/api/getStory`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                });

                if (!res.ok) {
                    throw new Error(`error: ${res.status}`);
                }

                const data = await res.json();
                setStories(data.stories || []);
            } catch (err) {
                console.error("error", err);
            }
        };

        fetchStories();
    }, [token]);

    const handleVoiceClick = (voiceId) => {
        console.log("Voice ID:", voiceId);
    };

    const handleStoryClick = (storyId) => {
        console.log("Story ID:", storyId);
    };

    return (
        <div className="static">
            {voices.length > 0 ? (
                voices.map((voice, index) => (
                    <div 
                        className="voice" 
                        key={index} 
                        onClick={() => handleVoiceClick(voice.voiceId)}
                        style={{ cursor: "pointer" }}
                    >
                        <p>{index + 1}</p>
                        <p>{voice.voiceId}</p>
                    </div>
                ))
            ) : (
                <p>0 voices</p>
            )}
            
            {stories.length > 0 ? (
                stories.map((story, index) => (
                    <div 
                        className="story" 
                        key={index} 
                        onClick={() => handleStoryClick(story.storyId)}
                        style={{ cursor: "pointer" }}
                    >
                        <p>{index + 1}</p>
                        <p>{story.story}</p>
                    </div>
                ))
            ) : (
                <p>0 stories</p>
            )}
        </div>
    );
}

export default Static;
