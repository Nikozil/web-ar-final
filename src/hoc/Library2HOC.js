import React from 'react';
import { useScriptLoader } from 'use-script-loader';
import { HOMEPAGE } from '../constants/constants';

const Library2HOC = ({ library, children }) => {
  const skipLinear = library === 'linear' ? false : true;
  const skipCent = library === 'cent' ? false : true;

  const [loading2, script2, error2] = useScriptLoader(
    `${HOMEPAGE}/libs/1.1.3/mindar-image-aframe.prod.js`,
    null,
    null,
    skipLinear
  );

  const [loading4, script4, error4] = useScriptLoader(
    `${HOMEPAGE}/libs/1.1.4/mindar-image-aframe.prod.js`,
    null,
    null,
    skipCent
  );
  const loading = loading2 || loading4;

  return (
    <>
      {/* <script src="../libs/1.1.3/mindar-image.prod.js"></script> */}
      {loading ? (
        <div className={'loading__modal'}>
          <div className={'loading__container'}>
            <div className={'loading__text'}>Loading...</div>
            <div className={'loading__spin'}></div>
          </div>
        </div>
      ) : (
        <>{children}</>
      )}
    </>
  );
};

export default Library2HOC;
