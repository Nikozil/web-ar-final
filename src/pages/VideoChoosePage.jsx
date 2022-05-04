import React, { useState } from 'react';

import neuron2 from '../resources/neuron2.jpg';
import default1 from '../resources/default.jpg';
import hiro from '../resources/hiro.png';
import neuronOnly from '../resources/neuronOnly.png';
import shortNeuron from '../resources/shortNeuron.jpg';
import pinball from '../resources/pinball.jpg';
import stones from '../resources/stones.jpg';

import neuron2Mind from '../resources/neuron2.mind';
import default1Mind from '../resources/default1.mind';
import hiroMind from '../resources/hiro.mind';
import neuronOnlyMind from '../resources/neuronOnly.mind';
import neuronhqMind from '../resources/neuronhq.mind';
import shortNeuronMind from '../resources/shortNeuron.mind';
import pinballMind from '../resources/pinball.mind';
import stonesMind from '../resources/stones.mind';

const VideoChoosenPage = ({
  setVideo,
  setMark,
  substate,
  setSubstrate,
  library,
  setLibrary,
}) => {
  const [selectedMark, setSelectedMark] = useState('neuron2');
  return (
    <div className="choosen-page">
      <div>Выберите метку</div>
      <div
        style={{
          display: 'flex',
          marginTop: '10px',
        }}>
        <div>
          <div
            onClick={() => {
              setMark(neuron2Mind);
              setSelectedMark('neuron2');
            }}>
            {selectedMark === 'neuron2' ? (
              <img src={neuron2} alt="" className="image_selected" />
            ) : (
              <img src={neuron2} alt="" className="image" />
            )}
          </div>

          <div
            onClick={() => {
              setMark(default1Mind);
              setSelectedMark('default1');
            }}>
            {selectedMark === 'default1' ? (
              <img src={default1} alt="" className="image_selected" />
            ) : (
              <img src={default1} alt="" className="image" />
            )}
          </div>

          <div
            onClick={() => {
              setMark(hiroMind);
              setSelectedMark('hiro');
            }}>
            {selectedMark === 'hiro' ? (
              <img src={hiro} alt="" className="image_selected" />
            ) : (
              <img src={hiro} alt="" className="image" />
            )}
          </div>
          <div
            onClick={() => {
              setMark(neuronOnlyMind);
              setSelectedMark('neuronOnly');
            }}>
            {selectedMark === 'neuronOnly' ? (
              <img src={neuronOnly} alt="" className="image_selected" />
            ) : (
              <img src={neuronOnly} alt="" className="image" />
            )}
          </div>
        </div>
        <div>
          <div
            onClick={() => {
              setMark(neuronhqMind);
              setSelectedMark('neuronhq');
            }}>
            {selectedMark === 'neuronhq' ? (
              <img src={neuron2} alt="" className="image_selected" />
            ) : (
              <img src={neuron2} alt="" className="image" />
            )}
          </div>
          <div
            onClick={() => {
              setMark(shortNeuronMind);
              setSelectedMark('shortNeuron');
            }}>
            {selectedMark === 'shortNeuron' ? (
              <img src={shortNeuron} alt="" className="image_selected" />
            ) : (
              <img src={shortNeuron} alt="" className="image" />
            )}
          </div>
          <div
            onClick={() => {
              setMark(pinballMind);
              setSelectedMark('pinball');
            }}>
            {selectedMark === 'pinball' ? (
              <img src={pinball} alt="" className="image_selected" />
            ) : (
              <img src={pinball} alt="" className="image" />
            )}
          </div>
          <div
            onClick={() => {
              setMark(stonesMind);
              setSelectedMark('stones');
            }}>
            {selectedMark === 'stones' ? (
              <img src={stones} alt="" className="image_selected" />
            ) : (
              <img src={stones} alt="" className="image" />
            )}
          </div>
        </div>
      </div>
      <div>Использовать подложку?</div>
      <div style={{ fontSize: '16px', cursor: 'pointer' }}>
        <input
          type="radio"
          id="yes"
          name="background"
          value={true}
          checked={substate === true}
          onChange={() => setSubstrate(true)}
        />
        <label htmlFor="yes" style={{ cursor: 'pointer' }}>
          Да
        </label>

        <input
          type="radio"
          id="no"
          name="background"
          checked={substate === false}
          onChange={() => setSubstrate(false)}
          value={false}
        />
        <label htmlFor="no" style={{ cursor: 'pointer' }}>
          Нет
        </label>
      </div>

      <div>Выбор сглаживания?</div>
      <div style={{ fontSize: '16px', cursor: 'pointer' }}>
        <input
          type="radio"
          id="linear"
          name="lib"
          value={'linear'}
          checked={library === 'linear'}
          onChange={() => setLibrary('linear')}
        />
        <label htmlFor="linear" style={{ cursor: 'pointer' }}>
          Линейная интерполяция
        </label>

        <input
          type="radio"
          id="cent"
          name="lib"
          checked={library === 'cent'}
          onChange={() => setLibrary('cent')}
          value={'cent'}
        />
        <label htmlFor="cent" style={{ cursor: 'pointer' }}>
          1 cent filter
        </label>
      </div>

      <div>Выберите технологию?</div>
      <div className="choosen-page__controls ">
        <div
          className="controls__btn"
          style={{
            padding: '5px',
          }}
          onClick={() => setVideo({ choosen: true, chromo: true })}>
          Chroma Key
        </div>
        <div
          style={{
            padding: '5px',
          }}
          className="controls__btn"
          onClick={() => setVideo({ choosen: true, chromo: false })}>
          Double video
        </div>
      </div>
    </div>
  );
};

export default VideoChoosenPage;
