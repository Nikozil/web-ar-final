import React from 'react';

import neuron2 from '../resources/neuron2.jpg';

const VideoChoosenPage = ({ setStart }) => {
  return (
    <div className="choosen-page">
      <div>УСТАНОВИТЕ ЛИНЕЙКУ НА СТОЛ И НАЖМИТЕ КНОПКУ НАЧАТЬ</div>
      <div
        style={{
          display: 'flex',
          marginTop: '10px',
        }}>
        <div>
          <div>
            {false ? (
              <img src={neuron2} alt="" className="image_selected" />
            ) : (
              <img src={neuron2} alt="" className="image" />
            )}
          </div>
        </div>
      </div>

      <div className="choosen-page__controls ">
        {/* <div className="controls__btn" onClick={() => setStart(true)}> */}
        <button
          className="controls__btn"
          onClick={() => {
            window.location.pathname = '/camera';
            // window.history.pushState('look ma!', undefined, '/camera');
          }}>
          Начать
        </button>
      </div>
    </div>
  );
};

export default VideoChoosenPage;
