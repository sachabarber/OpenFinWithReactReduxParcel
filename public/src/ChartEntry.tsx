import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ChartComponent } from './Chart';

if (window['module'] && window['module'].hot) {
  window['module'].hot.dispose(function() {});

  window['module'].hot.accept(function() {
      ReactDOM.render(<ChartComponent />, document.getElementById('root'));
  });
}

ReactDOM.render(<ChartComponent />, document.getElementById('root'));
