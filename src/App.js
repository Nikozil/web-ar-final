// import 'aframe';
// import 'aframe-particle-system-component';
// import { Entity, Scene } from 'aframe-react';
import React, { useEffect, useRef, useState } from 'react';
// import { Box, Sphere, Entity } from 'react-aframe-ar';
import './App.css';
// import video12 from './resources/test12.mp4';
// import NeuronVideo from './resources/NeuronVideo.mp4';
import NeuronVideoV2 from './resources/NeuronVideoV2.mp4';
import AppPage from './pages/AppPage';
// import NextVideo from './resources/video.mp4';
import NextVideo from './resources/NextVideo.mp4';

import neuron2 from './resources/neuron2.mind';
import ChoosenPage from './pages/ChoosenPage';
import VideoChoosenPage from './pages/VideoChoosePage';
import ChromoAppPage from './pages/ChromoAppPage';
import useWindowHeight from './hooks/useWindowHeight';
import LibraryHOC from './hoc/LibraryHOC';
import GLChroma from 'gl-chromakey';

function App() {
  const [width, height] = useWindowHeight();
  const [video, setVideo] = useState({ choosen: false, chromo: null });
  const [mark, setMark] = useState(neuron2);
  const [preload, setPreload] = useState({ choosen: false, status: null });
  const [substate, setSubstrate] = useState(false);
  const [library, setLibrary] = useState('linear');
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

  useEffect(() => {
    let processor = {
      timerCallback: function () {
        if (this.video.paused || this.video.ended) {
          return;
        }
        this.computeFrame();
        let self = this;
        setTimeout(function () {
          self.timerCallback();
        }, 0);
      },

      doLoad: function () {
        this.video = document.getElementById('my-video');
        this.c1 = document.getElementById('my-canvas');
        this.ctx1 = this.c1.getContext('2d');
        this.c2 = document.getElementById('c2');
        this.ctx2 = this.c2.getContext('2d');

        let self = this;
        this.video.addEventListener(
          'play',
          function () {
            self.width = self.video.videoWidth / 4;
            self.height = self.video.videoHeight / 4;
            self.timerCallback();
          },
          false
        );
      },

      computeFrame: function () {
        this.ctx1.drawImage(this.video, 0, 0, this.width, this.height);
        let frame = this.ctx1.getImageData(0, 0, this.width, this.height);
        let l = frame.data.length / 4;

        for (let i = 0; i < l; i++) {
          let r = frame.data[i * 4 + 0];
          let g = frame.data[i * 4 + 1];
          let b = frame.data[i * 4 + 2];
          if (g < 50 && r < 50 && b < 50) frame.data[i * 4 + 3] = 0;
        }
        this.ctx2.putImageData(frame, 0, 0);
        return;
      },
    };

    document.addEventListener('DOMContentLoaded', () => {
      processor.doLoad();
    });
  }, []);
  return (
    <div className="main-container">
      <video
        preload="auto"
        // autoplay="true"
        id="my-video"
        style={{ opacity: '0', width: '100%' }}
        // width="1920"
        // height="1080"
        // style={{ display: 'none' }}

        webkit-playsinline
        playsinline>
        <source src={NextVideo} type="video/mp4" />
      </video>
      <canvas
        id="my-canvas"
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
      </button>

      {/* {video.choosen ? (
        video.chromo ? (
          preload.choosen ? (
            <LibraryHOC library={library}>
              <ChromoAppPage
                preloadStatus={preload.status}
                mark={mark}
                substate={substate}
                width={width}
                height={height}
              />
            </LibraryHOC>
          ) : (
            <ChoosenPage setPreload={setPreload} />
          )
        ) : preload.choosen ? (
          <LibraryHOC library={library}>
            <AppPage
              preloadStatus={preload.status}
              mark={mark}
              substate={substate}
            />
          </LibraryHOC>
        ) : (
          <ChoosenPage setPreload={setPreload} />
        )
      ) : (
        <VideoChoosenPage
          setMark={setMark}
          setVideo={setVideo}
          substate={substate}
          setSubstrate={setSubstrate}
          library={library}
          setLibrary={setLibrary}
        />
      )} */}
    </div>
  );
}

export default App;
