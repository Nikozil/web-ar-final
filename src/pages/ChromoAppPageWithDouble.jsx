// import 'aframe';
// import 'aframe-particle-system-component';
// import { Entity, Scene } from 'aframe-react';
import React, { useEffect, useRef, useState } from 'react';
// import { Box, Sphere, Entity } from 'react-aframe-ar';
import '../App.css';
import {
  FILTER_BETA,
  FILTER_MIN_CF,
  INTERPOLATION_FACTOR,
  MISS_TOLERANCE,
  WARMUP_TOLERANCE,
} from '../constants/constants';
// import example4 from './resources/example.mp4';
import plane from '../resources/neuron2.jpg';
import neuron2 from '../resources/neuron2.mind';
// import video12 from './resources/test12.mp4';
// import NeuronVideo from './resources/NeuronVideo.mp4';
import NextVideo from '../resources/NextVideoDouble.mp4';
import NeuronVideoV2 from '../resources/NeuronVideoGreenShort8S.mp4';
import seeThru from 'seethru';

function ChromoAppPageWithDouble({ width, height }) {
  const targetRef = useRef();
  const sifruRef = useRef();
  const [hide, setHide] = useState(false);

  useEffect(() => {
    let timerId = setInterval(() => {
      const target = document.querySelector('#my-video');
      console.log('targetoutside', target);

      if (target) {
        clearInterval(timerId);
        console.log('target', target);
        sifruRef.current = seeThru.create('#my-video', {
          width: 960,
          height: 540,
        });

        sifruRef.current.ready((instance, video, canvas) => {
          canvas.id = 'canvasvideo';
          // canvas.style.setProperty('position', 'absolute');
          // canvas.style.setProperty('height', '635px');
          canvas.style.setProperty('height', 'auto');
          canvas.style.setProperty('width', '100%');
          // canvas.style.setProperty('height', 'min-content');
          // canvas.style.setProperty('width', 'min-content');
          // canvas.style.setProperty('height', 'min-content');
          canvas.style.setProperty('flex-shrink', '0');
          // canvas.style.setProperty('top', '15%');
          canvas.style.setProperty('display', 'none');

          video.setAttribute('webkit-playsinline', 'webkit-playsinline');
          video.setAttribute('playsinline', 'playsinline');
          video.addEventListener('ended', () => setEnd(true));

          // setInit(true);
        });
      }
    }, 2000);
  }, []);

  useEffect(() => {
    if (sifruRef.current)
      sifruRef.current.ready((instance, video, canvas) => {
        if (width > height) {
          canvas.style.setProperty('height', '100%');
          canvas.style.setProperty('width', 'auto');
        }
        if (height > width) {
          canvas.style.setProperty('width', '100%');
          canvas.style.setProperty('height', 'auto');
        }
      });
  }, [width, height]);

  const trailer = '';
  // const pauseRef = useRef(false);
  const [pause, setPause] = useState(false);
  const video = useRef();
  const [start, setStart] = useState(false);
  const [found, setFound] = useState(false);
  const [focus, setFocus] = useState(false);
  const [end, setEnd] = useState(false);
  const [choise, setChoise] = useState(false);

  const [isVideoLoad, setIsVideoLoad] = useState(NeuronVideoV2);

  const handleNext = () => {
    setHide(true);
    setIsVideoLoad(trailer);
    document.querySelector('#assetvideo').src = trailer;
    setStart(false);
    setChoise(true);
    // const video = document.getElementById('my-video');
    // video.play();
    sifruRef.current.ready((instance, video, canvas) => {
      canvas.style.setProperty('display', 'block');

      video.play();
      setStart(true);
    });
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

  const handleAgain = () => {
    document.querySelector('#assetvideo').play();
    setPause(false);
    setEnd(false);
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

  // useEffect(() => {
  //   const container = document.querySelector('.main-container');
  //   console.log('videosadfsadsadsad', container);

  //   if (container) {
  //     const video = container.lastChild;
  //     console.log('videosadfsad', width, height);
  //     // video.width = width;
  //     // video.height = height;
  //     let newWidth = width;
  //     let newHeight = height;
  //     if (width > height) newHeight = newHeight + 200;
  //     if (width < height) newWidth = newWidth + 200;
  //     video.style.setProperty('width', `${newWidth}px`);
  //     video.style.setProperty('height', `${newHeight}px`);
  //     video.style.setProperty('top', `0`);
  //     video.style.setProperty('left', `0`);
  //   }
  // }, [width, height]);

  // useEffect(() => {
  //   const video = document.getElementById('my-video');
  //   const canvas = document.getElementById('my-canvas');
  //   const chroma = new GLChroma(video, canvas);
  //   // chroma.key([0, 0, 0]);
  //   // chroma.key({ color: [0, 255, 0], tolerance: 0.3 });

  //   let frameId;
  //   const startChroma = () => {
  //     // chroma.key([0, 0, 0]);

  //     frameId = window.requestAnimationFrame(startChroma);
  //     chroma.render();
  //   };
  //   const stopChroma = () => window.cancelAnimationFrame(frameId);

  //   // link to <video> element
  //   video.addEventListener('play', startChroma);
  //   video.addEventListener('pause', stopChroma);
  //   video.addEventListener('ended', stopChroma);
  // }, []);

  return (
    <>
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <video
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
      </div>
      {/*  <canvas
        id="my-canvas"
        style={{
          position: 'absolute',
          zIndex: '2',
          width: '1920px',
          height: '1080px',
          // width: '100%',
          // height: '100%',
        }}></canvas> */}
      {false ? (
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
          {end && !choise && (
            <div
              style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                zIndex: 50,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
              }}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  marginBottom: '5px',
                }}>
                <button
                  id="example-start-button"
                  className="choise__btn"
                  onClick={handleAgain}>
                  Проиграть снова
                </button>
                <button
                  style={{ fontWeight: 900 }}
                  id="example-start-button"
                  className="choise__btn"
                  onClick={handleNext}>
                  Посмотреть новый ролик
                </button>
              </div>
              <div className="comment">
                для просмотра нового ролика рекомендуем навести камеру на темный
                фон
              </div>
            </div>
          )}
          <div
            id="example-control-overlay"
            class="overlay"
            style={{ background: 'none', height: '30px' }}>
            {found && (
              <div className="controls">
                {end ? null : !start ? (
                  <button
                    id="example-start-button"
                    className="controls__btn"
                    // onClick={handleNext}
                    onClick={handleStart}>
                    Старт
                  </button>
                ) : (
                  <button
                    id="example-pause-button"
                    className="controls__btn"
                    onClick={handlePause}>
                    {/* Pause */}
                    {pause ? 'Продолжить' : 'Пауза'}
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

            mindar-image={`filterMinCF:${FILTER_MIN_CF}; filterBeta: ${FILTER_BETA};interpolationFactor:${INTERPOLATION_FACTOR};warmupTolerance: ${WARMUP_TOLERANCE};missTolerance: ${MISS_TOLERANCE}; imageTargetSrc: ${neuron2};`}
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

              {!hide && (
                <a-plane
                  // position="0.24 -0.25 -0.2"
                  // position="0.24 -0.25 0.1"
                  rotation="0 0 0 "
                  // position="0.22 -0.26 0"

                  // position="0.22 -0.15 0"
                  // position="0.23 -0.14 0.1"
                  position={'0.22 -0.15 0'}
                  // material="shader: chromakey; src: #assetvideo; color: 0.1 0.9 0.2"
                  width="1.1475"
                  height="0.675"
                  material="shader: chromakey; src: #assetvideo; color: 0 0 0"
                  // material="shader: flat; src: #assetvideo"
                  // position="0 1 -10"
                  // scale="15 25 15"
                ></a-plane>
              )}
              {/* </a-entity> */}
            </a-entity>
          </a-scene>
        </>
      )}
    </>
  );
}

export default ChromoAppPageWithDouble;
