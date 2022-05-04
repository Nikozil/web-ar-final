// import 'aframe';
// import 'aframe-particle-system-component';
// import { Entity, Scene } from 'aframe-react';
import React, { useState } from 'react';
// import { Box, Sphere, Entity } from 'react-aframe-ar';
import './App.css';
import useWindowHeight from './hooks/useWindowHeight';
import ChromoAppPage from './pages/ChromoAppPage';
import ChromoAppPageWithDouble from './pages/ChromoAppPageWithDouble';
import VideoChoosenPage from './pages/VideoChoosePage';
import neuron2 from './resources/neuron2.mind';

function App() {
  const [width, height] = useWindowHeight();
  // const [width, height] = [0, 0];
  const [start, setStart] = useState(false);

  const handleNext = () => {
    const video = document.getElementById('my-video');
    video.play();
  };
  // useEffect(() => {
  //   const video = document.getElementById('my-video');
  //   const canvas = document.getElementById('my-canvas');
  //   const chroma = new GLChroma(video, canvas);
  //   // chroma.key([0, 0, 0]);
  //   // chroma.key({ color: [0, 255, 0], tolerance: 0.3 });

  //   let frameId;
  //   const startChroma = () => {
  //     // chroma.key([1, 1, 1]);

  //     frameId = window.requestAnimationFrame(startChroma);
  //     chroma.render();
  //   };
  //   const stopChroma = () => window.cancelAnimationFrame(frameId);

  //   // link to <video> element
  //   video.addEventListener('play', startChroma);
  //   video.addEventListener('pause', stopChroma);
  //   video.addEventListener('ended', stopChroma);
  // }, []);

  // useEffect(() => {
  //   let processor = {
  //     timerCallback: function () {
  //       if (this.video.paused || this.video.ended) {
  //         return;
  //       }
  //       this.computeFrame();
  //       let self = this;
  //       setTimeout(function () {
  //         self.timerCallback();
  //       }, 0);
  //     },

  //     doLoad: function () {
  //       this.video = document.getElementById('my-video');
  //       this.c1 = document.getElementById('my-canvas');
  //       this.ctx1 = this.c1.getContext('2d');
  //       this.c2 = document.getElementById('c2');
  //       this.ctx2 = this.c2.getContext('2d');

  //       let self = this;
  //       this.video.addEventListener(
  //         'play',
  //         function () {
  //           self.width = self.video.videoWidth;
  //           self.height = self.video.videoHeight;
  //           self.timerCallback();
  //         },
  //         false
  //       );
  //     },

  //     computeFrame: function () {
  //       this.ctx1.drawImage(this.video, 0, 0, this.width, this.height);
  //       let frame = this.ctx1.getImageData(0, 0, this.width, this.height);
  //       let l = frame.data.length / 4;

  //       for (let i = 0; i < l; i++) {
  //         let r = frame.data[i * 4 + 0];
  //         let g = frame.data[i * 4 + 1];
  //         let b = frame.data[i * 4 + 2];
  //         if (g < 40 && r < 40 && b < 40) frame.data[i * 4 + 3] = 0;
  //       }
  //       this.ctx2.putImageData(frame, 0, 0);
  //       return;
  //     },
  //   };

  //   document.addEventListener('DOMContentLoaded', () => {
  //     processor.doLoad();
  //   });
  // }, []);
  return (
    <div className="main-container">
      {/* <video
        preload="auto"
        // autoplay="true"
        id="my-video"
        style={{ opacity: '0', width: '100%' }}
        width="1920"
        height="1080"
        // style={{ display: 'none' }}

        webkit-playsinline
        playsinline>
        <source src={NextVideo} type="video/mp4" />
      </video>
      <canvas
        id="my-canvas"
        width="1920"
        height="1080"
        style={{
          opacity: '0',
          position: 'absolute',
          top: '0',
          left: '0',
          zIndex: '2',
          width: '100%',
        }}></canvas>
      <canvas
        id="c2"
        width="1920"
        height="1080"
        style={{
          // opacity: '0',
          position: 'absolute',
          top: '0',
          left: '0',
          zIndex: '2',
          width: '100%',
        }}></canvas>
      <button
        id="example-start-button"
        className="controls__btn"
        style={{
          position: 'absolute',
          bottom: '0',
        }}
        onClick={handleNext}
        // onClick={handleStart}
      >
        Start
      </button> */}

      {start ? (
        <ChromoAppPageWithDouble
          width={width}
          height={height}
          handlesetStart={setStart}
        />
      ) : (
        <VideoChoosenPage setStart={setStart} />
      )}
    </div>
  );
}

export default App;
