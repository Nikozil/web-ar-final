// import 'aframe';
// import 'aframe-particle-system-component';
// import { Entity, Scene } from 'aframe-react';
import React, { useEffect, useRef, useState } from 'react';
// import { Box, Sphere, Entity } from 'react-aframe-ar';
import '../App.css';
// import video12 from './resources/test12.mp4';
// import NeuronVideo from './resources/NeuronVideo.mp4';
import NeuronVideoV2 from '../resources/NeuronVideoGreenShort8S.mp4';
// import NeuronVideoV2 from '../resources/short.mp4';
// import trailer from '../resources/NextVideo.mp4';
import NextVideo from '../resources/NextVideo.mp4';
import cardpng from '../resources/card.png';
import card1111 from '../resources/card1111.mind';
import GLChroma from 'gl-chromakey';

// import example4 from './resources/example.mp4';

import plane from '../resources/neuron2.jpg';
import {
  FILTER_BETA,
  FILTER_MIN_CF,
  INTERPOLATION_FACTOR,
  MISS_TOLERANCE,
  WARMUP_TOLERANCE,
} from '../constants/constants';

function ChromoAppPage({ preloadStatus, mark, substate, width, height }) {
  const sifruRef = useRef();
  const assetRef = useRef();
  const planeRef = useRef();
  const targetRef = useRef();

  const trailer = '';
  // const pauseRef = useRef(false);
  const [pause, setPause] = useState(false);
  const video = useRef();
  const [start, setStart] = useState(false);
  const [found, setFound] = useState(false);
  const [focus, setFocus] = useState(false);
  const [end, setEnd] = useState(false);

  const [isVideoLoad, setIsVideoLoad] = useState(false);

  const handleNext = () => {
    setIsVideoLoad(trailer);
    document.querySelector('#assetvideo').src = trailer;
    setStart(false);
    setEnd(false);
    const video = document.getElementById('my-video');
    video.play();
  };

  const handleStart = () => {
    document.querySelector('#assetvideo').play();
    setStart(true);
    document
      .querySelector('#assetvideo')
      .addEventListener('ended', () => setEnd(true));
  };
  const handlePause = () => {
    if (!pause) document.querySelector('#assetvideo').pause();
    if (pause) document.querySelector('#assetvideo').play();
    setPause((prev) => !prev);
  };

  const handleTargetFound = () => {
    setFound(true);
    if (!focus) setFocus(true);
    // console.dir(planeRef.current);
  };
  const handleTargetLost = () => {
    // if (focus) setFocus(false);
    setFocus(false);
  };

  useEffect(() => {
    if (targetRef.current) {
      targetRef.current.addEventListener('targetFound', handleTargetFound);
      targetRef.current.addEventListener('targetLost', handleTargetLost);
      // console.dir(targetRef.current);
    }
  }, [isVideoLoad]);

  useEffect(() => {
    if (preloadStatus) prefetch_file(NeuronVideoV2, onSuccess);
    else setIsVideoLoad(NeuronVideoV2);
  }, [preloadStatus]);

  useEffect(() => {
    const container = document.querySelector('.main-container');
    console.log('videosadfsadsadsad', container);

    if (container) {
      const video = container.lastChild;
      console.log('videosadfsad', video);
      video.width = width;
      video.height = height;
      video.style.setProperty('width', `${width}px`);
      video.style.setProperty('height', `${height}px`);
    }
  }, [width, height]);

  useEffect(() => {
    const video = document.getElementById('my-video');
    const canvas = document.getElementById('my-canvas');
    const chroma = new GLChroma(video, canvas);
    // chroma.key([0, 0, 0]);
    // chroma.key({ color: [0, 255, 0], tolerance: 0.3 });

    let frameId;
    const startChroma = () => {
      // chroma.key([0, 0, 0]);

      frameId = window.requestAnimationFrame(startChroma);
      chroma.render();
    };
    const stopChroma = () => window.cancelAnimationFrame(frameId);

    // link to <video> element
    video.addEventListener('play', startChroma);
    video.addEventListener('pause', stopChroma);
    video.addEventListener('ended', stopChroma);
  }, []);

  function onSuccess(url) {
    // video.current.src = url;
    setIsVideoLoad(url);
  }

  function prefetch_file(
    url,
    fetched_callback,
    progress_callback = () => {},
    error_callback = () => {}
  ) {
    var xhr = new XMLHttpRequest();
    console.log('url', url);
    xhr.open('GET', url, true);
    xhr.responseType = 'blob';

    xhr.addEventListener(
      'load',
      function () {
        if (xhr.status === 200) {
          var URL = window.URL || window.webkitURL;
          var blob_url = URL.createObjectURL(xhr.response);
          fetched_callback(blob_url);
        } else {
          error_callback();
        }
      },
      false
    );

    var prev_pc = 0;
    xhr.addEventListener('progress', function (event) {
      if (event.lengthComputable) {
        var pc = Math.round((event.loaded / event.total) * 100);
        if (pc !== prev_pc) {
          prev_pc = pc;
          progress_callback(pc);
        }
      }
    });
    console.log('xhr', xhr);
    xhr.send();
  }

  return (
    <>
      <video
        ref={video}
        preload="auto"
        // autoplay="true"
        id="my-video"
        style={{ opacity: '0' }}
        width="1920"
        height="1080"
        // style={{ display: 'none' }}

        webkit-playsinline
        playsinline>
        <source src={NextVideo} type="video/mp4" />
      </video>
      <canvas
        id="my-canvas"
        style={{
          position: 'absolute',
          zIndex: '2',
          width: '1920px',
          height: '1080px',
          // width: '100%',
          // height: '100%',
        }}></canvas>
      {!isVideoLoad ? (
        <div className={'loading__modal'}>
          <div className={'loading__container'}>
            <div className={'loading__text'}>Loading...</div>
            <div className={'loading__spin'}></div>
          </div>
        </div>
      ) : (
        <>
          <div className={'indicator'}>
            {' '}
            {focus ? (
              <div className={'indicator__green'}></div>
            ) : (
              <div className={'indicator__red'}></div>
            )}
          </div>
          <div
            id="example-control-overlay"
            class="overlay"
            style={{ background: 'none', height: '30px' }}>
            {found && (
              <div className="controls">
                {end ? (
                  <button
                    id="example-start-button"
                    className="controls__btn"
                    onClick={handleNext}>
                    Next
                  </button>
                ) : !start ? (
                  <button
                    id="example-start-button"
                    className="controls__btn"
                    onClick={handleNext}
                    // onClick={handleStart}
                  >
                    Start
                  </button>
                ) : (
                  <button
                    id="example-pause-button"
                    className="controls__btn"
                    onClick={handlePause}>
                    {/* Pause */}
                    {pause ? 'Play' : 'Pause'}
                  </button>
                )}
              </div>
            )}
          </div>
          <a-scene
            // mindar-image={`imageTargetSrc: ${neuron2};`}
            // mindar-image={`filterMinCF:0.0000001; filterBeta: 1000000;warmupTolerance: 10;missTolerance: 10;imageTargetSrc: ${neuron2};`}
            // mindar-image={`imageTargetSrc: https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.0.0/examples/image-tracking/assets/card-example/card.mind;`}
            // mindar-image={`filterMinCF:${filters.filterMinCF}; filterBeta: ${filters.filterBeta};warmupTolerance: ${filters.warmupTolerance};missTolerance: ${filters.missTolerance};interpolationFactor :10;imageTargetSrc: ${card1111};`}
            // mindar-image={`warmupTolerance: 0;missTolerance: 0; imageTargetSrc: ${mark};`}

            mindar-image={`filterMinCF:${FILTER_MIN_CF}; filterBeta: ${FILTER_BETA};interpolationFactor:${INTERPOLATION_FACTOR};warmupTolerance: ${WARMUP_TOLERANCE};missTolerance: ${MISS_TOLERANCE}; imageTargetSrc: ${mark};`}
            // mindar-image={`filterMinCF:0.00004; filterBeta: 0.00007;interpolationFactor:5;warmupTolerance: 3;missTolerance: 0; imageTargetSrc: ${mark};`}
            // mindar-image={`filterMinCF:0.004; filterBeta: 0.0007;warmupTolerance: 0;missTolerance: 0; imageTargetSrc: ${mark};`}
            // mindar-image={`filterMinCF:0.004; filterBeta: 0.7;warmupTolerance: 0;missTolerance: 0; imageTargetSrc: ${mark};`}
            // mindar-image={`filterMinCF:0.0000001; filterBeta: 1000000;warmupTolerance: 0;missTolerance: 0; imageTargetSrc: ${mark};`}
            // mindar-image={`filterMinCF:${filters.filterMinCF}; filterBeta: ${filters.filterBeta};warmupTolerance: ${filters.warmupTolerance};missTolerance: ${filters.missTolerance};interpolationFactor :10;imageTargetSrc: ${mark};`}
            vr-mode-ui="enabled: false"
            stats
            color-space="sRGB"
            embedded
            renderer="colorManagement: true, physicallyCorrectLights"
            device-orientation-permission-ui="enabled: false">
            <a-assets>
              <img id="card" src={plane} alt="" />
              <video
                ref={video}
                preload="auto"
                // autoplay="true"
                id="assetvideo"
                style={{ opacity: '0' }}
                width="1920"
                height="1080"
                // style={{ display: 'none' }}

                webkit-playsinline
                playsinline>
                <source src={isVideoLoad} type="video/mp4" />
              </video>
              {/* <video
                ref={video}
                preload="auto"
                // autoplay="true"
                id="assetvideo"
                style={{ opacity: '0' }}
                loop
                // style={{ display: 'none' }}
                webkit-playsinline
                playsinline>
                <source src={NeuronVideoV2} type="video/mp4" />
              </video> */}
            </a-assets>

            <a-camera
              position="0 0 0"
              // raycaster="far: 1.1.4"
              // raycaster="objects: .cantap"
              look-controls="enabled: false"></a-camera>

            {/* <a-plane
                  mindar-image-target="targetIndex: 0"
                  src="#card"
                  position="0 0 0"
                  height="0.552"
                  width="1"
                  rotation="0 0 0"></a-plane> */}
            <a-entity mindar-image-target="targetIndex: 0" ref={targetRef}>
              {/* <a-plane
                    src="#card2"
                    position="0 0 0"
                    height="0.552"
                    width="1"
                    rotation="0 0 0"></a-plane> */}
              {/* <a-entity
                    id="target"
                    // position="0.24 -0.25 0"
                    // position="0.22 -0.20 0"
                    // position="0 0 0"
                    // position="0 0 -0.06"
                    // rotation="0 0 0"
                    // width="1.1475"
                    // height="0.675"
                  > */}
              {substate && (
                <a-plane
                  src="#card"
                  position="0 0 0"
                  // position="0 0 0"
                  // height="0.552"
                  // width="1"
                  opaciy="0.8"
                  // height="0.485"
                  height="0.421"
                  width="1"
                  // scale="0.99 0.99 0.99"
                  rotation="0 0 0"></a-plane>
              )}
              <a-plane
                // position="0.24 -0.25 -0.2"
                // position="0.24 -0.25 0.1"
                rotation="0 0 0 "
                // position="0.22 -0.26 0"

                // position="0.22 -0.15 0"
                // position="0.23 -0.14 0.1"
                position={substate ? '0.23 -0.14 0.1' : '0.22 -0.15 0'}
                // material="shader: chromakey; src: #assetvideo; color: 0.1 0.9 0.2"
                width="1.1475"
                height="0.675"
                material="shader: chromakey; src: #assetvideo; color: 0 0 0"
                // material="shader: flat; src: #assetvideo"
                // position="0 1 -10"
                // scale="15 25 15"
              ></a-plane>
              {/* </a-entity> */}
            </a-entity>
          </a-scene>
        </>
      )}
    </>
  );
}

export default ChromoAppPage;
