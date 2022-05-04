import React from 'react';

const ChoosenPage = ({ setPreload }) => {
  return (
    <div className="choosen-page">
      <div>Предзагрузить видео?</div>
      <div className="choosen-page__controls ">
        <div
          className="controls__btn"
          onClick={() => setPreload({ choosen: true, status: true })}>
          Да
        </div>
        <div
          className="controls__btn"
          onClick={() => setPreload({ choosen: true, status: false })}>
          Нет
        </div>
      </div>
      <div style={{ fontSize: '17px' }}>
        В случае отсутствия предзагрузки видео могут наблюдаться задержки
      </div>
    </div>
  );
};

export default ChoosenPage;
