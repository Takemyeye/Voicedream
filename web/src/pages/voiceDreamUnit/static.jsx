import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Modal from "./components/modal"; 

const Static = () => {
  const [stories, setStories] = useState([]);
  const [selectedStory, setSelectedStory] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const token = Cookies.get("token");

      if (!token) {
        throw new Error("Token not found");
      }

      const storyResponse = await fetch("http://88.99.39.233/api/getStory", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!storyResponse.ok) {
        throw new Error("Failed to fetch stories");
      }

      const storyData = await storyResponse.json();
      setStories(storyData.stories);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleStoryClick = (story) => {
    setSelectedStory(story);
  };

  const closeModal = () => {
    setSelectedStory(null);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="static">
      <h1>Stories</h1>
      <div>
        {stories.length > 0 ? (
          stories.map((story, index) => (
            <div key={index} onClick={() => handleStoryClick(story)}>
              <h2>{story.title}</h2>
              <p>{story.story}</p>
            </div>
          ))
        ) : (
          <p>No stories found</p>
        )}
      </div>

      {selectedStory && (
        <Modal story={selectedStory} onClose={closeModal} />
      )}
    </div>
  );
};

export default Static;
