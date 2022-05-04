import React, { useEffect, useRef, useState } from 'react';
// import { Box, Sphere, Entity } from 'react-aframe-ar';
import '../App.css';
// import video12 from './resources/test12.mp4';
// import NeuronVideo from './resources/NeuronVideo.mp4';
import NeuronVideoV2 from '../resources/NeuronVideoV2.mp4';

import neuron2 from '../resources/neuron2.mind';
import ArDouble from './ArDouble';

function AppPage({ preloadStatus, mark, substate }) {
  const assetRef = useRef();
  // const pauseRef = useRef(false);
  const [isVideoLoad, setIsVideoLoad] = useState(false);

  useEffect(() => {
    if (preloadStatus) {
      prefetch_file(NeuronVideoV2, onSuccess);
    } else {
      setIsVideoLoad(NeuronVideoV2);
    }
  }, [preloadStatus]);

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
      {!isVideoLoad ? (
        <div className={'loading__modal'}>
          <div className={'loading__container'}>
            <div className={'loading__text'}>Loading...</div>
            <div className={'loading__spin'}></div>
          </div>
        </div>
      ) : (
        <ArDouble mark={mark} isVideoLoad={isVideoLoad} substate={substate} />
      )}
    </>
  );
}

export default AppPage;
