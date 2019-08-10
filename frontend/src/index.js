import React from 'react';
import ReactDOM from 'react-dom';
import App from 'components/App';
import 'style/style.less';

ReactDOM.render(<App />, document.getElementById('app'));

if (module.hot) {
  module.hot.accept();
}
