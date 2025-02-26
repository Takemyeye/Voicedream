import React from "react";

export function BlockStory ({ userId, title, min, place, argument, count, names }) {

    return(
        <div className="block storyBlock">
            <h4>{userId}</h4>
            <h4>{title}</h4>
            <h4>{min}</h4>
            <h4>{place}</h4>
            <h4>{argument}</h4>
            <h4>{count}</h4>
            <h4>{names}</h4>
        </div>
    )
}