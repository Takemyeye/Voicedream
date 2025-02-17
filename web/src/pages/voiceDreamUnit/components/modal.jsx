import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

const Modal = ({ story, onClose }) => {
  const [voices, setVoices] = useState([]);
  const [selectedVoices, setSelectedVoices] = useState({});

  const fetchVoices = async () => {
    try {
      const token = Cookies.get("token");
      if (!token) {
        throw new Error("Token not found");
      }

      const voiceResponse = await fetch("http://localhost:3001/api/getVoice", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const voiceData = await voiceResponse.json();
      console.log("Voices fetched:", voiceData);  // Логируем полученные голоса
      setVoices(voiceData.voices);
    } catch (error) {
      console.error("Error fetching voices:", error.message);
    }
  };

  const handleVoiceChange = (name, voiceId) => {
    setSelectedVoices((prevSelectedVoices) => ({
      ...prevSelectedVoices,
      [name]: voiceId,
    }));
  };

  const handleSubmitVoices = async () => {
    try {
      const token = Cookies.get("token");
      const storyId = story.storyId;
      if (!token || !storyId) {
        throw new Error("Token or storyId is missing");
      }

      // Формируем данные для отправки
      const selectedVoicesData = Object.entries(selectedVoices).map(([name, voiceId]) => ({
        characterName: name,
        voiceId: voiceId,
      }));

      console.log("Submitting voices:", selectedVoicesData); // Логируем, что отправляем на сервер

      if (selectedVoicesData.length > 0) {
        const response = await fetch("http://localhost:3001/api/ttsScript", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            storyId: storyId,
            token: token,
            voices: selectedVoicesData, // Отправляем массив объектов с именами и voiceId
          }),
        });

        const result = await response.json();
        console.log("Server response:", result); // Логируем ответ сервера

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
        <h2>{story.title}</h2>
        <p>{story.story}</p>

        {story.argument && <p><strong>Argument:</strong> {story.argument}</p>}
        {story.place && <p><strong>Place:</strong> {story.place}</p>}
        {story.count && <p><strong>Count:</strong> {story.count}</p>}

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
              <div key={index}>
                <p>{voice.voiceName}</p>
              </div>
            ))
          ) : (
            <p>No voices found</p>
          )}
        </div>

        <button onClick={onClose}>Close</button>
        <button onClick={handleSubmitVoices}>Submit Voices</button>
      </div>
    </div>
  );
};

export default Modal;
