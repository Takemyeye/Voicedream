import React, { useState } from "react";
import Cookies from "js-cookie";

const Create = () => {
  const [numberCharacters, setNumberCharacters] = useState("");
  const [nameCharacters, setNameCharacters] = useState("");
  const [token] = useState(Cookies.get("token"));
  const [response, setResponse] = useState(null);
  const [argument, setArgument] = useState("");
  const [script, setScript] = useState("");
  const [title, setTitle] = useState("");
  const [place, setPlace] = useState("");
  const [min, setMin] = useState("");
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestBody = {
      title,
      token,
      min: Number(min),
      nameCharacters,
      place,
      numberCharacters: Number(numberCharacters),
      argument,
      script
    };

    try {
      const res = await fetch("https://cp.voicedream.space/api/chat", {
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
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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
        <h1>voui un copione?</h1>
          <input
            type="checkbox"
            checked={script}
            onChange={(e) => setScript(e.target.checked)}
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
