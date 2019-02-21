import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BlotterComponent } from './Blotter';


if (window['module'] && window['module'].hot) {
  window['module'].hot.dispose(function() {});

  window['module'].hot.accept(function() {
      ReactDOM.render(<BlotterComponent />, document.getElementById('root'));
  });
}

ReactDOM.render(<BlotterComponent />, document.getElementById('root'));
