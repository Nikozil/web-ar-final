import React from 'react';

const AR = () => {
  return (
    <a-marker preset="hiro">
      <a-video
        canvas-updater
        vidhandler
        // width="5.1"
        // height="3"
        width="8.5"
        height="5"
        src="#canvasvideo"
        // src="#assetvideo"
        // position="0 20 0"
        position="0.7 -0.5 -0.7"
        // position="0.8 0 -0.7"
        rotation="-75  90 0"
        transparent="true"
        webkit-playsinline
        playsinline></a-video>
    </a-marker>
  );
};

export default AR;
