import React from "react";
import { BlockStory } from "./storyblock";

export function StoriesList({ stories }) {
  return (
    <>
      <div className="text">
        <h1>Stories</h1>
      </div>
      <div className="stories-list">
        <BlockStory
          userId="userId"
          title="title"
          min="min"
          place="place"
          argument="argument"
          count="count"
          names="names"
        />
        {stories.length > 0 ? (
          stories.map((story) => (
            <BlockStory
              key={story.userId}
              userId={story.userId}
              title={story.title}
              min={story.min}
              place={story.place}
              argument={story.argument}
              count={story.count}
              names={story.names}
            />
          ))
        ) : (
          <p>No stories found.</p>
        )}
      </div>
    </>
  );
}
