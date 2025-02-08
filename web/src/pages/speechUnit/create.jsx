import Cookies from "js-cookie";
import React, { useState } from "react";

const Create = () => {
  const [token] = useState(Cookies.get("token"));
  const [voiceName, setVoiceName] = useState("");
  const [voiceId, setVoiceId] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token || !voiceName || !voiceId) {
      setMessage("All fields are required!");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/voice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        }, 
        body: JSON.stringify({
          token,
          voiceName,
          voiceId,
        }),
      });

      const data = await response.json();

      if (data && data.message) {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage("Something went wrong");
    }
  };

  return (
    <div>
      <h1>Create Voice</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Voice Name:</label>
          <input
            type="text"
            value={voiceName}
            onChange={(e) => setVoiceName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Voice ID:</label>
          <input
            type="text"
            value={voiceId}
            onChange={(e) => setVoiceId(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Voice</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Create;
