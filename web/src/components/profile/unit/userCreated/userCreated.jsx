import React from "react";
import { StoryList } from "./storyList";
import { VoiceList } from "./voiceList";
import { UserStory } from "./userStory";

const UserCreated = ({user}) => {
    if(!user) {return}

    return(
        <>
            <div className="text">
                <h2>Created by: {user.username}</h2>
                <h5>Created component "story & voice"</h5>
            </div>
            <div className="block">
                <StoryList />
                <VoiceList />
                <UserStory />
            </div>
        </>
    )
}

export default UserCreated;