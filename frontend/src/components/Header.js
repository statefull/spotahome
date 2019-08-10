import React from 'react';
import { Logger } from 'react-logger-lib';
import { translations as LOCALES } from 'locales/locales';
import is from 'is_js';

function Header(props) {
  Logger.of('Header').info('props=', props);

  const classPrefix = is.mobile() ? 'header_mobile' : 'header';

  return (
    <header className={classPrefix}>
      <div className={`${classPrefix}__logo`}>{LOCALES.component.header.brandName}</div>
      {is.desktop() && (
        <div className={`${classPrefix}__links`}>
          <nav className={`${classPrefix}__links__list`}>
            <a>{LOCALES.component.header.theCompany}</a>
            <a>{LOCALES.component.header.howWeWork}</a>
            <a>{LOCALES.component.header.contactUs}</a>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
