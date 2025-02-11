import Cookies from "js-cookie";
import React, { useState, useRef } from "react";

const Create = () => {
  const [token] = useState(Cookies.get("token"));
  const [voiceName, setVoiceName] = useState("");
  const [message, setMessage] = useState("");
  const [audioFile, setAudioFile] = useState(null);
  const mediaRecorderRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioURL, setAudioURL] = useState(null);

  const handleFileChange = (e) => {
    setAudioFile(e.target.files[0]);
    setAudioBlob(null);
    setAudioURL(URL.createObjectURL(e.target.files[0]));
  };

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      const chunks = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        chunks.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/wav" });
        setAudioBlob(blob);
        setAudioURL(URL.createObjectURL(blob));
      };

      mediaRecorderRef.current.start();
      setRecording(true);
    } catch (error) {
      console.error("Microphone access error:", error);
      setMessage("Failed to access microphone");
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token || !voiceName || (!audioFile && !audioBlob)) {
      setMessage("All fields and an audio file are required!");
      return;
    }

    const formData = new FormData();
    formData.append("token", token);
    formData.append("voiceName", voiceName);
    formData.append("audio", audioFile || audioBlob);

    try {
      const response = await fetch("http://localhost:3001/api/voice", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data && data.message) {
        setMessage(data.message);
      }
    } catch (error) {
      console.error("Error sending data:", error);
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
          <label>Upload:</label>
          <input type="file" accept="audio/*" onChange={handleFileChange} />
        </div>
        <div>
          {recording ? (
            <button type="button" onClick={handleStopRecording}>Stop</button>
          ) : (
            <button type="button" onClick={handleStartRecording}>Start</button>
          )}
        </div>
        {audioURL && (
          <div>
            <p>Playback:</p>
            <audio controls src={audioURL}></audio>
          </div>
        )}
        <button type="submit">Create Voice</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Create;
