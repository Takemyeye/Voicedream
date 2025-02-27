import Cookies from "js-cookie";
import React, { useState, useEffect, useCallback, useRef } from "react";

const StoryDream = () => {
  const [audioFiles, setAudioFiles] = useState([]);
  const [token] = useState(Cookies.get("token"));
  const [error, setError] = useState(null);
  const audioRefs = useRef([]);

  const fetchAudioFiles = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:3001/api/audio", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error fetching audio files");
      }

      const data = await response.json();

      if (data.files && data.files.length > 0) {
        setAudioFiles(data.files);
      } else {
        setError("No audio files available");
      }
    } catch (err) {
      setError("Failed to load files");
    }
  }, [token]);

  useEffect(() => {
    fetchAudioFiles();
  }, [fetchAudioFiles]);

  return (
    <main>
      <h1>Listen to Your Stories</h1>
      {error && <p>{error}</p>}
      <ul>
        {audioFiles.map((file, index) => (
          <li key={index}>
            <h3>File {index + 1}</h3>
            <audio ref={(el) => (audioRefs.current[index] = el)} controls>
              <source
                src={`http://localhost:3001/api/audio/${file.id}`}
                type="audio/mp3"
              />
            </audio>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default StoryDream;
