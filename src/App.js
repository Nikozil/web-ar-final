// import 'aframe';
// import 'aframe-particle-system-component';
// import { Entity, Scene } from 'aframe-react';
import React, { useState } from 'react';
import {
  Route,
  Router,
  Routes,
  Navigate,
  BrowserRouter,
} from 'react-router-dom';
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

  const isSizes = width > 0 && height > 0;

  const isLoad = isSizes ? (
    <ChromoAppPageWithDouble
      width={width}
      height={height}
      handlesetStart={setStart}
    />
  ) : (
    <div className={'loading__modal'}>
      <div className={'loading__container'}>
        <div className={'loading__text'}>Loading...</div>
        <div className={'loading__spin'}></div>
      </div>
    </div>
  );

  return (
    <BrowserRouter>
      <div className="main-container">
        <Routes>
          {/* <Navigate to="/main" /> */}

          {/* <Route path="/camera">
            <ChromoAppPageWithDouble
              width={width}
              height={height}
              handlesetStart={setStart}
            />
          </Route> */}
          <Route
            path="/"
            element={<VideoChoosenPage setStart={setStart} />}></Route>
          <Route path="/camera" element={isLoad}></Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        {/* {start ? (
          <ChromoAppPageWithDouble
            width={width}
            height={height}
            handlesetStart={setStart}
          />
        ) : (
          <VideoChoosenPage setStart={setStart} />
        )} */}
      </div>
    </BrowserRouter>
  );
}

export default App;
