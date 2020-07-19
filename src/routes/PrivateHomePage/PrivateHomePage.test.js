import React from 'react';
import ReactDOM from 'react-dom';
import PrivateHomePage from './PrivateHomePage';
import { BrowserRouter } from 'react-router-dom';

describe('<PrivateHomePage />', () => {
    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(
      <BrowserRouter>
        <PrivateHomePage/>
      </BrowserRouter>
      , div);
      ReactDOM.unmountComponentAtNode(div);
    });
    });