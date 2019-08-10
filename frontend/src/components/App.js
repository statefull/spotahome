import React, { useState, useEffect } from 'react';
import { Logger } from 'react-logger-lib';
import Header from 'components/Header';
import Homecards from 'components/Homecards';
import Loading from 'components/Loading';
import { getHomecards } from 'utils/api';
import is from 'is_js';

function App(props) {
  Logger.of('App').info('props=', props);

  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [homecards, setHomecards] = useState([]);

  useEffect(() => {
    getHomecards()
      .then((homecards) => {
        setHomecards(homecards);
        setIsDataLoaded(true);
      })
      .catch(() => {}); //TODO: manage error
  }, []);

  return (
    <main className={is.mobile() ? 'container_mobile' : 'container'}>
      <Header />
      {isDataLoaded ? <Homecards homecards={homecards} /> : <Loading />}
    </main>
  );
}

export default App;
