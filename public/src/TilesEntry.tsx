import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { TilesComponent } from './Tiles';


if (window['module'] && window['module'].hot) {
  window['module'].hot.dispose(function() {});

  window['module'].hot.accept(function() {
      ReactDOM.render(<TilesComponent />, document.getElementById('root'));
  });
}

ReactDOM.render(<TilesComponent />, document.getElementById('root'));
