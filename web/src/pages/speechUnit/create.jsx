import Cookies from "js-cookie";
import React, { useState, useRef } from "react";
import Recorder from "recorder-js";

const Create = () => {
  const [token] = useState(Cookies.get("token"));
  const [voiceName, setVoiceName] = useState("");
  const [message, setMessage] = useState("");
  const [audioFile, setAudioFile] = useState(null);
  const [audioURL, setAudioURL] = useState(null);
  const [recording, setRecording] = useState(false);
  const recorderRef = useRef(null);
  const audioContextRef = useRef(null);
  const streamRef = useRef(null);

  const handleFileChange = (e) => {
    setAudioFile(e.target.files[0]);
    setAudioURL(URL.createObjectURL(e.target.files[0]));
  };

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      recorderRef.current = new Recorder(audioContextRef.current);
      recorderRef.current.init(stream);

      recorderRef.current.start();
      setRecording(true);
    } catch (error) {
      console.error("Microphone access error:", error);
      setMessage("Failed to access microphone");
    }
  };

  const handleStopRecording = async () => {
    if (!recorderRef.current) return;

    const { blob } = await recorderRef.current.stop();
    setRecording(false);

    const mp3File = new File([blob], `${voiceName}.mp3`, { type: "audio/mp3" });
    setAudioFile(mp3File);
    setAudioURL(URL.createObjectURL(mp3File));

    streamRef.current.getTracks().forEach((track) => track.stop());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token || !voiceName || !audioFile) {
      setMessage("All fields and an audio file are required!");
      return;
    }

    const formData = new FormData();
    formData.append("token", token);
    formData.append("voiceName", voiceName);
    formData.append("audio", audioFile);

    try {
      const response = await fetch("https://cp.voicedream.space/api/voice", {
        method: "POST",
        body: formData,
      });

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        setMessage(data.message);
      } else {
        const text = await response.text();
        setMessage(text);
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
            <button type="button" onClick={handleStopRecording}>Stop Recording</button>
          ) : (
            <button type="button" onClick={handleStartRecording}>Start Recording</button>
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
