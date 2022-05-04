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

import neuron2 from './resources/neuron2.mind';
import ChoosenPage from './pages/ChoosenPage';
import VideoChoosenPage from './pages/VideoChoosePage';
import ChromoAppPage from './pages/ChromoAppPage';
import useWindowHeight from './hooks/useWindowHeight';
import LibraryHOC from './hoc/LibraryHOC';

function App() {
  const [width, height] = useWindowHeight();
  const [video, setVideo] = useState({ choosen: false, chromo: null });
  const [mark, setMark] = useState(neuron2);
  const [preload, setPreload] = useState({ choosen: false, status: null });
  const [substate, setSubstrate] = useState(false);
  const [library, setLibrary] = useState('linear');

  return (
    <div className="main-container">
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
