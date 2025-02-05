import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

const Create = () => {
  const [story, setStory] = useState("");
  const [token, setToken] = useState(null);
  const [min, setMin] = useState("");
  const [nameCharacters, setNameCharacters] = useState("");
  const [place, setPlace] = useState("");
  const [numberCharacters, setNumberCharacters] = useState("");
  const [argument, setArgument] = useState("");
  const [response, setResponse] = useState(null);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setToken(token);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestBody = {
      story,
      token,
      min: Number(min),
      nameCharacters,
      place,
      numberCharacters: Number(numberCharacters),
      argument,
    };

    try {
      const res = await fetch("http://localhost:3001/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      const data = await res.json();

      setResponse(data.reply);
    } catch (err) {
          setResponse(null);
    }
  };

  return (
    <div className="create">
      <div className="text">
        <h1>Create Your Story</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Story"
          value={story}
          onChange={(e) => setStory(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Min"
          value={min}
          onChange={(e) => setMin(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Name of Characters"
          value={nameCharacters}
          onChange={(e) => setNameCharacters(e.target.value)}
        />
        <input
          type="text"
          placeholder="Place"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
        />
        <input
          type="number"
          placeholder="Number of Characters"
          value={numberCharacters}
          onChange={(e) => setNumberCharacters(e.target.value)}
        />
        <input
          type="text"
          placeholder="Argument"
          value={argument}
          onChange={(e) => setArgument(e.target.value)}
        />
        <button type="submit">Generate Story</button>
      </form>

      {response && (
        <div className="response">
          <p>{response}</p>
        </div>
      )}

    </div>
  );
};

export default Create;
