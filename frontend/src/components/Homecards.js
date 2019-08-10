import React from 'react';
import { Logger } from 'react-logger-lib';
import Homecard from 'components/Homecard';
import PropTypes from 'prop-types';
import is from 'is_js';

function Homecards(props) {
  Logger.of('Homecards').info('props=', props);

  const homecars = props.homecards.map(
    ({ id, adId, currencySymbol, pricePerMonth, photoUrls: { homecardHidpi }, title }) => (
      <Homecard
        key={`${id}${adId}`}
        price={`${pricePerMonth}${currencySymbol}`}
        image={homecardHidpi}
        title={title}
      />
    ),
  );

  return <section className={is.mobile() ? 'homecards_mobile' : 'homecards'}>{homecars}</section>;
}

Homecards.propTypes = {
  homecards: PropTypes.array.isRequired,
};

export default Homecards;
