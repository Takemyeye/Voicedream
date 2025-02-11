import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import VoiceList from "./components/voiceList";
import StoryList from "./components/storyList";

const Static = () => {
    const [token] = useState(Cookies.get("token"));
    const [voices, setVoices] = useState([]);
    const [stories, setStories] = useState([]);
    const [selectedVoiceId, setSelectedVoiceId] = useState(null);
    const [selectedStoryId, setSelectedStoryId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [audioUrl, setAudioUrl] = useState(null);

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
        setSelectedVoiceId(voiceId);
    };

    const handleStoryClick = (storyId) => {
        setSelectedStoryId(storyId);
    };

    const handleCreateClick = async () => {
        if (!selectedVoiceId || !selectedStoryId) {
            alert("Please select both a voice and a story.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const res = await fetch("http://localhost:3001/api/tts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    token: token,
                    voiceId: selectedVoiceId,
                    storyId: selectedStoryId,
                }),
            });

            if (!res.ok) {
                throw new Error(`Failed to create: ${res.status}`);
            }

            const data = await res.json();
            const fileId = data.fileId;

            const audioRes = await fetch(`http://localhost:3001/api/audio/${fileId}`);

            if (!audioRes.ok) {
                throw new Error(`Failed to fetch audio: ${audioRes.status}`);
            }

            const audioBlob = await audioRes.blob();
            setAudioUrl(URL.createObjectURL(audioBlob));

        } catch (err) {
            console.error("Error creating TTS:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="static">
            <VoiceList voices={voices} onVoiceClick={handleVoiceClick} />
            <StoryList stories={stories} onStoryClick={handleStoryClick} />
            
            <div>
                {selectedVoiceId && <p>Selected Voice ID: {selectedVoiceId}</p>}
                {selectedStoryId && <p>Selected Story ID: {selectedStoryId}</p>}
            </div>
            
            <div>
                <button onClick={handleCreateClick} disabled={loading}>
                    {loading ? "Creating..." : "Create TTS"}
                </button>
                {error && <p style={{ color: "red" }}>Error: {error}</p>}
            </div>

            <div>
                {audioUrl && <audio controls src={audioUrl} />}
            </div>
        </div>
    );
};

export default Static;
