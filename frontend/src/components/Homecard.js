import React from 'react';
import { Logger } from 'react-logger-lib';
import { translations as LOCALES } from 'locales/locales';
import PropTypes from 'prop-types';
import is from 'is_js';

function Homecard(props) {
  Logger.of('Homecard').info('props=', props);
  const classPrefix = is.mobile() ? 'homecard_mobile' : 'homecard';

  return (
    <article className={classPrefix}>
      <figure className={`${classPrefix}__image`}>
        <img src={props.image} alt={props.title} />
      </figure>
      <div className={`${classPrefix}__description`}>
        <div className={`${classPrefix}__description__information`}>
          <div className={`${classPrefix}__description__information__title`}>{props.title}</div>
          <div className={`${classPrefix}__description__information__price`}>
            <div className={`${classPrefix}__description__information__price--yellow`}>
              {props.price}
            </div>
          </div>
        </div>
        <div className={`${classPrefix}__description__actions`}>
          {is.desktop() && (
            <button className="button button--primary">
              {LOCALES.component.homecard.moreDetails}
            </button>
          )}
          <button className="button button--secondary">{LOCALES.component.homecard.bookNow}</button>
        </div>
      </div>
    </article>
  );
}

Homecard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
};

export default Homecard;
