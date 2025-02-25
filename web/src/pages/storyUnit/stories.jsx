import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import '@/styles/stories.css';

const Stories = () => {
    const [token] = useState(Cookies.get("token"));
    const [stories, setStories] = useState([]);

    useEffect(() => {
        const fetchStories = async () => {
            try {
                const res = await fetch(`https://cp.voicedream.space/api/getStory`, {
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
                console.log('stories:', data);
            } catch (err) {
                console.error("error", err);
            }
        };

        fetchStories(); 
    }, [token]);

    return (
        <div className="stories">
            {stories.length > 0 ? (
                stories.map((story, index) => (
                    <div className="story" key={index}>
                        <p>{index + 1}</p>
                        <pre>{story.story}</pre>
                    </div>
                ))
            ) : (
                <p>0 storie</p>
            )}
        </div>
    );
};

export default Stories;
