import React, { useEffect, useRef, useState } from 'react';
import seeThru from 'seethru';
import {
  FILTER_BETA,
  FILTER_MIN_CF,
  INTERPOLATION_FACTOR,
  MISS_TOLERANCE,
  WARMUP_TOLERANCE,
} from '../constants/constants';

import plane from '../resources/neuron2.jpg';
import kolor from '../resources/kolor.mp4';
// import NeuronVideoV2Short from '../resources/NeuronVideoV2Short.mp4';

const ArDouble = ({ mark, isVideoLoad, substate }) => {
  const sifruRef = useRef();
  const targetRef = useRef();
  const video = useRef(null);

  const [pause, setPause] = useState(false);
  const [init, setInit] = useState(false);
  const [found, setFound] = useState(false);
  const [focus, setFocus] = useState(false);
  const [start, setStart] = useState(false);
  const [end, setEnd] = useState(false);

  useEffect(() => {
    let timerId = setInterval(() => {
      const target = document.querySelector('#assetvideo');
      console.log('targetoutside', target);

      if (target) {
        clearInterval(timerId);
        console.log('target', target);
        sifruRef.current = seeThru.create('#assetvideo');

        sifruRef.current.ready((instance, video, canvas) => {
          canvas.id = 'canvasvideo';

          video.setAttribute('webkit-playsinline', 'webkit-playsinline');
          video.setAttribute('playsinline', 'playsinline');
          video.addEventListener('ended', () => setEnd(true));

          setInit(true);
        });
      }
    }, 2000);
  }, []);

  const handleNext = () => {
    sifruRef.current.ready((instance, video, canvas) => {
      video.src = kolor;
    });
    setStart(false);
    setEnd(false);
  };

  const handleStart = () => {
    sifruRef.current.ready((instance, video, canvas) => {
      video.play();
      setStart(true);
    });
  };
  const handlePause = () => {
    if (!pause) sifruRef.current.pause();
    if (pause) sifruRef.current.play();

    setPause((prev) => !prev);
  };

  const handleTargetFound = () => {
    setFound(true);
    if (!focus) setFocus(true);
  };
  const handleTargetLost = () => {
    // if (focus) setFocus(false);
    setFocus(false);
  };

  useEffect(() => {
    if (targetRef.current) {
      targetRef.current.addEventListener('targetFound', handleTargetFound);
      targetRef.current.addEventListener('targetLost', handleTargetLost);
    }
  }, [init]);

  return (
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
        className="overlay"
        style={{ background: 'none', height: '30px' }}>
        {init && found && (
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
                onClick={handleStart}>
                Start
              </button>
            ) : (
              <button
                id="example-pause-button"
                className="controls__btn"
                onClick={handlePause}>
                {pause ? 'Play' : 'Pause'}
              </button>
            )}
          </div>
        )}
      </div>

      <a-scene
        // mindar-image="imageTargetSrc: https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.1.4/examples/image-tracking/assets/card-example/card.mind;"
        // mindar-image={'imageTargetSrc:' + `${target}`}
        // mindar-image={`imageTargetSrc: ${neuron2}; filterMinCF:0.000001; filterBeta: 100000; warmupTolerance: 0; missTolerance: 0`}
        // mindar-image={`imageTargetSrc: ${neuron2}; filterMinCF:0.000001; filterBeta: 10; warmupTolerance: 0; missTolerance: 0`}
        // mindar-image={`imageTargetSrc: ${neuron2}; filterMinCF:0.001; filterBeta: 1000; warmupTolerance: 0; missTolerance: 0`}
        // mindar-image={`imageTargetSrc: ${neuron2}; filterMinCF:0.00001; filterBeta:  100000; warmupTolerance: 0; missTolerance: 0`}
        mindar-image={`filterMinCF:${FILTER_MIN_CF}; filterBeta: ${FILTER_BETA};interpolationFactor:${INTERPOLATION_FACTOR};warmupTolerance: ${WARMUP_TOLERANCE};missTolerance: ${MISS_TOLERANCE}; imageTargetSrc: ${mark};`}
        // mindar-image={`warmupTolerance: 0; missTolerance: 0; imageTargetSrc: ${mark};`}
        // mindar-image={`filterMinCF:${filters.filterMinCF}; filterBeta: ${filters.filterBeta};warmupTolerance: ${filters.warmupTolerance};missTolerance: ${filters.missTolerance};imageTargetSrc: ${mark};`}
        color-space="sRGB"
        renderer="colorManagement: true, physicallyCorrectLights"
        stats
        embedded
        vr-mode-ui="enabled: false"
        device-orientation-permission-ui="enabled: false">
        <a-assets>
          <img id="card" src={plane} alt="" />
          <video
            ref={video}
            preload="auto"
            id="assetvideo"
            // width="1920"
            // height="2160"
            // src={NeuronVideoV2Short}
            src={isVideoLoad}
            style={{ display: 'none' }}
            webkit-playsinline
            playsinline></video>
          {/* <video
            ref={video}
            preload="auto"
            id="assetvideo"
            loop
            style={{ display: 'none' }}
            webkit-playsinline
            playsinline>
            <source src={kolor} type="video/mp4" />
            <source src={isVideoLoad} type="video/mp4" />
            <source src={NeuronVideoV2} type="video/mp4" />
            <source src={video2} type="video/webm" />
          </video> */}
        </a-assets>

        <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

        {init ? (
          <a-entity mindar-image-target="targetIndex: 0" ref={targetRef}>
            {/* <a-plane
          src="#card"
          position="0 0 0"
          height="0.552"
          width="1"
          rotation="0 0 0"></a-plane> */}
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
            <a-video
              // position="0.22 -0.15 0"
              position={substate ? '0.23 -0.14 0.1' : '0.22 -0.15 0'}
              // position="0.22 -0.25 0"
              rotation="0 0 0"
              // position="0.24 -0.22 0"
              // width="5.1"
              // height="3"
              // width="1.275"
              // height="0.75"
              width="1.1475"
              height="0.675"
              src="#canvasvideo"
              // src="#assetvideo"

              transparent="true"
              webkit-playsinline
              playsinline
              canvas-updater
              // vidhandler
            ></a-video>
            {/* <a-entity
      rotation="30 45 45"
      position="0 0 0.1"
      // mindar-image-target="targetIndex: 0"
      // material="shader: flat; src: #assetvideo"
      material="shader: flat; src: #canvasvideo"
      // rotation="90 90 90"
      // geometry="primitive: plane; width: 2.25; height: 5.25"
      geometry="primitive: plane; width: 1.275; height: 0.75"
      visible="false"
      canvas-updater></a-entity> */}
          </a-entity>
        ) : null}
      </a-scene>
    </>
  );
};

export default ArDouble;
