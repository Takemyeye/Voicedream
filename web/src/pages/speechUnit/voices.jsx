import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

const Voices = () => {
    const [token] = useState(Cookies.get("token"));
    const [voices, setVoices] = useState([]);

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

    const handlePlayVoice = (voiceId) => {
        const audio = new Audio(`http://localhost:3001/voice/${voiceId}`);
        audio.play().catch((err) => console.error("Error playing audio:", err));
    };

    return (
        <div className="speaches">
            {voices.map((voice) => (
                <div key={voice.voiceId}>
                    <button onClick={() => handlePlayVoice(voice.voiceId)}>
                        Play {voice.voiceName}
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Voices;
