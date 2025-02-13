import React from 'react';

const AudioPlayer = ({ audioSrc }) => {
    return (
        <div>
            <audio controls>
                <source src={audioSrc} type="audio/mpeg" />
                Your
                 browser does not support the audio element.
            </audio>
        </div>
    );
};

export default AudioPlayer;
