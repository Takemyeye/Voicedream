import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

// styles
import "@/styles/voices.css";

const Voices = () => {
    const [token] = useState(Cookies.get("token"));
    const [voices, setVoices] = useState([]);
    const [playingVoice, setPlayingVoice] = useState(null);

    useEffect(() => {
        const fetchVoices = async () => {
            try {
                const res = await fetch(`https://cp.voicedream.space/api/getVoice`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!res.ok) {
                    throw new Error(`error: ${res.status}`);
                }

                const data = await res.json();
                console.log("data:", data)
                setVoices(data.voices || []);
            } catch (err) {
                console.error("error", err);
            }
        };

        fetchVoices();
    }, [token]);

    const fetchAndPlayAudio = async (voiceId) => {
        try {
            const res = await fetch(`https://cp.voicedream.space/api/getvoice/audio/${voiceId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!res.ok) {
                throw new Error(`error: ${res.status}`);
            }

            const previewUrl = await res.json();

            if (!previewUrl) {
                console.error("No preview URL available");
                return;
            }

            if (playingVoice) {
                playingVoice.pause();
            }

            const audio = new Audio(previewUrl);
            setPlayingVoice(audio);
            audio.play();
        } catch (err) {
            console.error("Error fetching preview URL:", err);
        }
    };

    return (
        <div className="voices">
            {voices.length > 0 ? (
                voices.map((voice, index) => (
                    <div className="voice" key={index}>
                        <p>{voice.voiceName}</p>
                        <button onClick={() => fetchAndPlayAudio(voice.voiceId)}>
                            ▶ Play Voice
                        </button>
                    </div>
                ))
            ) : (
                <p>0 voices</p>
            )}
        </div>
    );
};

export default Voices;
