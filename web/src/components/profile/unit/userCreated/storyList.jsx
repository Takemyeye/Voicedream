import React, { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import Cookies from "js-cookie";

// styles
import "@splidejs/react-splide/css";
import "../../style/created.css";
import { UiBadge } from "@/ui/badge";

export function StoryList() {
  const [stories, setStories] = useState([]);
  const token = Cookies.get("token");

  useEffect(() => {
    const fetchStories = async () => {
      if (!token) return;

      try {
        const response = await fetch("http://localhost:3001/api/getStoryUser", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          console.error("Error fetching stories:", response.status);
          return;
        }

        const data = await response.json();
        setStories(data.stories || []);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchStories();
  }, [token]);

  if (stories.length === 0) return null;

  return (
    <>
      <div className="text">
        <h2>Story</h2>
      </div>
      <Splide
        options={{
          perPage: 3,
          rewind: true,
          gap: "1rem",
          pagination: false,
          arrows: stories.length >= 3
        }}
      >
        {stories.map((story, index) => (
          <SplideSlide key={index}>
            <div className="story-block">
              <UiBadge className="badge1" text={story.title}/>
              <h5 style={{fontSize: "clamp(10px, 2vw, 14px)"}}>{story.story}</h5>
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </>
  );
}
