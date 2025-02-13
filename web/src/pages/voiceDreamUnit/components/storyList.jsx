import React from "react";

const StoryList = ({ stories, onStoryClick }) => {
    return (
        <div>
            {stories.length > 0 ? (
                stories.map((story, index) => (
                    <div
                        className="story"
                        key={index}
                        onClick={() => onStoryClick(story.storyId)}
                        style={{ cursor: "pointer" }}
                    >
                        <p>{index + 1}</p>
                        <p>{story.story}</p>
                    </div>
                ))
            ) : (
                <p>0 stories</p>
            )}
        </div>
    );
};

export default StoryList;
