import React from 'react';
import { Logger } from 'react-logger-lib';

function Loading(props) {
  Logger.of('Loading').info('props=', props);

  return <div className="loader">Loading...</div>;
}

export default Loading;
