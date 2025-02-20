import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

const Modal = ({ story, onClose }) => {
  const [voices, setVoices] = useState([]);
  const [selectedVoices, setSelectedVoices] = useState({});
  const [selectedVoiceId, setSelectedVoiceId] = useState(""); // Store the selected voiceId
  const [extraData, setExtraData] = useState(null); // Store additional data here

  const fetchVoices = async () => {
    try {
      const token = Cookies.get("token");
      if (!token) {
        throw new Error("Token not found");
      }

      const voiceResponse = await fetch("http://88.99.39.233/api/getVoice", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const voiceData = await voiceResponse.json();
      console.log("Voices fetched:", voiceData);
      setVoices(voiceData.voices);
    } catch (error) {
      console.error("Error fetching voices:", error.message);
    }
  };

  const handleVoiceChange = (name, voiceId) => {
    // Log the selected voiceId to the console
    console.log("Selected Voice ID:", voiceId);

    setSelectedVoices((prevSelectedVoices) => ({
      ...prevSelectedVoices,
      [name]: voiceId,
    }));

    setSelectedVoiceId(voiceId); // Update the selected voiceId
  };

  const handleSubmitVoices = async () => {
    try {
      const token = Cookies.get("token");
      const storyId = story.storyId;
      if (!token || !storyId) {
        throw new Error("Token or storyId is missing");
      }

      const selectedVoicesData = Object.entries(selectedVoices).map(([name, voiceId]) => ({
        characterName: name,
        voiceId: voiceId,
      }));

      console.log("Submitting voices:", selectedVoicesData);

      if (selectedVoicesData.length > 0) {
        const response = await fetch("http://88.99.39.233/api/ttsScript", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            storyId: storyId,
            token: token,
            voices: selectedVoicesData,
          }),
        });

        const result = await response.json();
        console.log("Server response:", result);

        if (result.fileId) {
          console.log("File generated:", result.fileId);
        } else {
          console.error("Error:", result.error);
        }
      }
    } catch (error) {
      console.error("Error submitting voices:", error.message);
    }
  };

  const fetchExtraData = async () => {
    try {
        const token = Cookies.get("token");
        const storyId = story.storyId;
        if (!token || !storyId) {
          throw new Error("Token or storyId is missing");
        }

      // Log the voiceId before making the request
      console.log("Submitting Voice ID to server:", selectedVoiceId);

      const response = await fetch("http://88.99.39.233/api/tts", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          storyId: storyId,
          token: token,
          voiceId: selectedVoiceId, // Pass selected voiceId
        }),
      });

      const data = await response.json();
      console.log("Extra data fetched:", data);
      setExtraData(data);
    } catch (error) {
      console.error("Error fetching extra data:", error.message);
    }
  };

  useEffect(() => {
    fetchVoices();
  }, []);

  const getNamesArray = (names) => {
    if (typeof names === "string") {
      return names.split(" ");
    }
    return [];
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {story.names && (
          <div>
            <h3>Names</h3>
            {getNamesArray(story.names).map((name, index) => (
              <div key={index}>
                <p>{name}</p>
                <select
                  value={selectedVoices[name] || ""}
                  onChange={(e) => handleVoiceChange(name, e.target.value)}
                >
                  <option value="">Select Voice</option>
                  {voices.map((voice) => (
                    <option key={voice.voiceId} value={voice.voiceId}>
                      {voice.voiceName}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        )}

        <h3>Voices</h3>
        <div>
          {voices.length > 0 ? (
            voices.map((voice, index) => (
              <div
                key={index}
                onClick={() => {
                  console.log(`Voice clicked: ${voice.voiceId}`);
                  setSelectedVoiceId(voice.voiceId);
                }}
                style={{
                  cursor: "pointer",
                  padding: "10px",
                  margin: "5px",
                  backgroundColor: selectedVoiceId === voice.voiceId ? "lightgray" : "white",
                }}
              >
                <p>{voice.voiceName}</p>
              </div>
            ))
          ) : (
            <p>No voices found</p>
          )}
        </div>

        <button onClick={onClose}>Close</button>
      </div>

      {story.count < 2 ? (
        <div className="modal-content">
          <h1>{story.title}</h1>
          {story.argument && <p><strong>Argument:</strong> {story.argument}</p>}
          {story.place && <p><strong>Place:</strong> {story.place}</p>}
          {story.count && <p><strong>Count:</strong> {story.count}</p>}
          <button onClick={fetchExtraData}>VoiceDream</button>

          {extraData && (
            <div>
              <h3>Extra Data:</h3>
              <p>{JSON.stringify(extraData)}</p>
            </div>
          )}
        </div>
      ) : (
        <div className="modal-content">
          <h1>{story.title}</h1>
          {story.argument && <p><strong>Argument:</strong> {story.argument}</p>}
          {story.place && <p><strong>Place:</strong> {story.place}</p>}
          {story.count && <p><strong>Count:</strong> {story.count}</p>}
          <button onClick={handleSubmitVoices}>VoiceDream</button>
        </div>
      )}
    </div>
  );
};

export default Modal;
