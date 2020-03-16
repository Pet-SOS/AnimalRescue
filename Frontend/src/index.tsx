import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from 'react-router';
import {Provider} from 'react-redux';
import {App} from './App';
import * as serviceWorker from './serviceWorker';
import {store, history} from "./store";
import './styles/index.scss';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEnvelope, faKey } from '@fortawesome/free-solid-svg-icons';
import { API_YOTUBE, API } from './api';

async function getBaseUrl() {
  const res = await fetch('../api/config.json');
  const data = await res.text()
  return JSON.parse(data)
}

API.interceptors.request.use(
  async config => {
    config.baseURL = await getBaseUrl().then(data => data.REACT_APP_API_URL);
    return config;
  },
  error => Promise.reject(error)
);

API_YOTUBE.interceptors.request.use(
  async config => {
    config.baseURL = await getBaseUrl().then(data => data.REACT_APP_YOUTUBE_URL);
    config.params.channelId = await getBaseUrl().then(data => data.REACT_APP_CHANEL_ID);
    config.params.key = await getBaseUrl().then(data => data.REACT_APP_YOUTUBE_API_KEY);
    return config;
  },
  error => Promise.reject(error)
)

library.add(faEnvelope, faKey);

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <App/>
        </Router>
    </Provider>,
    document.getElementById('root')
);

history.listen(() => window.scrollTo(0, 0))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
