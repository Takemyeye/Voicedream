import React from 'react';

const AudioPlayer = ({ audioSrc }) => {
    return (
        <div>
            <audio controls>
                <source src={audioSrc} type="audio/mpeg" />
            </audio>
        </div>
    );
};

export default AudioPlayer;
