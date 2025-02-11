import React from "react";

const VoiceList = ({ voices, onVoiceClick }) => {
    return (
        <div>
            {voices.length > 0 ? (
                voices.map((voice, index) => (
                    <div
                        className="voice"
                        key={index}
                        onClick={() => onVoiceClick(voice.voiceId)}
                        style={{ cursor: "pointer" }}
                    >
                        <p>{index + 1}</p>
                        <p>{voice.voiceId}</p>
                    </div>
                ))
            ) : (
                <p>0 voices</p>
            )}
        </div>
    );
};

export default VoiceList;
