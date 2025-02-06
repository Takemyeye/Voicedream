import React, { useState, useRef } from "react";
import Cookies from "js-cookie";

const Create = () => {
  const [voiceName, setVoiceName] = useState("");
  const [audioData, setAudioData] = useState(null);
  const audioRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [token] = useState(Cookies.get("token"));
  const mediaRecorderRef = useRef(null);

  const startRecording = () => {
    setIsRecording(true);
    navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
            const mediaRecorder = new MediaRecorder(stream, {mimeType: "audio/webm"});
            mediaRecorderRef.current = mediaRecorder;
            const chunks = [];
  
            mediaRecorder.ondataavailable = (event) => {
                chunks.push(event.data);
            };
  
            mediaRecorder.onstop = () => {
                const blob = new Blob(chunks, { type: "audio/webm" });
                const audioUrl = URL.createObjectURL(blob);
                setAudioData(blob);
                audioRef.current.src = audioUrl;
  
                const reader = new FileReader();
                reader.onloadend = () => {
                    const base64Audio = reader.result.split(',')[1];
                    console.log("Base64 Audio Data:", base64Audio);
                    setAudioData(base64Audio);
                };
                reader.readAsDataURL(blob);
            };
  
            mediaRecorder.start();
            setTimeout(() => {
                if (mediaRecorder.state !== "inactive") {
                    mediaRecorder.stop();
                    setIsRecording(false);
                }
            }, 30000);
        })
        .catch((err) => {
            console.error("Error accessing microphone", err);
        });
};


  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleSubmit = async () => {
    if (voiceName && audioData && token) {
      const jsonData = {
        token: token,
        voiceName: voiceName,
        audioData: audioData,
      };

      const response = await fetch("http://localhost:3001/api/voice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
      });

      if (response.ok) {
        console.log("Voice saved successfully");
      } else {
        console.log("Error saving voice");
      }
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Voice Name"
        value={voiceName}
        onChange={(e) => setVoiceName(e.target.value)}
      />
      <button onClick={startRecording} disabled={isRecording}>
        {isRecording ? "Recording..." : "Start Recording"}
      </button>
      {isRecording && (
        <button onClick={stopRecording}>
          Stop Recording
        </button>
      )}
      <audio ref={audioRef} controls />
      <button onClick={handleSubmit} disabled={!voiceName || !audioData}>Clone Voice</button>
    </div>
  );
};

export default Create;
