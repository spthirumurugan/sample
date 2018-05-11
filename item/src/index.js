import React from 'react';
import ReactDOM from 'react-dom';
import App from 'cdlo_components/startup/app';
import PouchProvider from 'cdlo_components/pouch/pouch_provider';
import config from './config/config';
import experiment from './experiment/reducers/experiment';
import AppContainer from './app_container';
import startupAction from './startup/startup_action';

ReactDOM.render(
  <PouchProvider
    id={config.metadata.id}
    reducers={experiment}
    config={config}
    startupAction={startupAction}
  >
    <App>
      <AppContainer />
    </App>
  </PouchProvider>
    , document.querySelector('#cdlo'));
