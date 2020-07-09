import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter } from 'react-router-dom';
import {UserProvider} from './contexts/UserContext';
import {MessageProvider} from './contexts/MessagesContext';
import './index.css';
import App from '../src/components/app/App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <BrowserRouter>
      <MessageProvider>
      <UserProvider>
        <App/>
      </UserProvider>
      </MessageProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
