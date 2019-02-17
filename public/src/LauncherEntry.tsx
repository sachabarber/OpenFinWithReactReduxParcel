import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { LauncherComponent } from './Launcher';

if (window['module'] && window['module'].hot) {
  window['module'].hot.dispose(function() {});

  window['module'].hot.accept(function() {
      ReactDOM.render(<LauncherComponent />, document.getElementById('root'));
  });
}

ReactDOM.render(<LauncherComponent />, document.getElementById('root'));
