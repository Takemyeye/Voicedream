import React from "react";
import { BlockUserStory } from "./userstoryblok";

export function UserStoriesList({ userStories }) {
  return (
    <>
      <div className="text">
        <h1>User Stories</h1>
      </div>
      <div className="user-stories-list">
        <BlockUserStory
          userId="userId"
          id="id"
          voiceId="voiceId"
          storyId="storyId"
        />
        {userStories.length > 0 ? (
          userStories.map((userStory) => (
            <BlockUserStory
              key={userStory.id}
              userId={userStory.userId}
              id={userStory.id}
              voiceId={userStory.voiceId}
              storyId={userStory.storyId}
            />
          ))
        ) : (
          <p>No user stories found.</p>
        )}
      </div>
    </>
  );
}
