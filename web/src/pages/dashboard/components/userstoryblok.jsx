import React from "react";

export function BlockUserStory ({ userId, id, voiceId, storyId }) {

    return(
        <div className="block userStoryBlock">
            <h4>{id}</h4>
            <h4>{userId}</h4>
            <h4>{voiceId}</h4>
            <h4>{storyId}</h4>
        </div>
    )
}