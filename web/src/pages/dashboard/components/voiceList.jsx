import React from "react";
import { Blockvoice } from "./voiceblock";

export function VoicesList({ voices }) {
  return (
    <>
      <div className="text">
        <h1>Voices</h1>
      </div>
      <div className="voices-list">
        <Blockvoice
          voiceId="voiceId"
          voiceName="voiceName"
          userId="userId"
        />
        {voices.length > 0 ? (
          voices.map((voice) => (
            <Blockvoice
              key={voice.voiceId}
              voiceId={voice.voiceId}
              voiceName={voice.voiceName}
              userId={voice.userId}
            />
          ))
        ) : (
          <p>No voices found.</p>
        )}
      </div>
    </>
  );
}
