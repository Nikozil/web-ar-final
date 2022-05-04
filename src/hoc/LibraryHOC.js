import React from 'react';
import { useScriptLoader } from 'use-script-loader';
import { HOMEPAGE } from '../constants/constants';
import Library2HOC from './Library2HOC';

const LibraryHOC = ({ library, children }) => {
  const skipLinear = library === 'linear' ? false : true;
  const skipCent = library === 'cent' ? false : true;

  const [loading1, script1, error1] = useScriptLoader(
    `${HOMEPAGE}/libs/1.1.3/mindar-image.prod.js`,
    null,
    null,
    skipLinear
  );

  const [loading3, script3, error3] = useScriptLoader(
    `${HOMEPAGE}/libs/1.1.4/mindar-image.prod.js`,
    null,
    null,
    skipCent
  );

  const loading = loading1 || loading3;

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
        <Library2HOC library={library}>{children}</Library2HOC>
      )}
    </>
  );
};

export default LibraryHOC;
