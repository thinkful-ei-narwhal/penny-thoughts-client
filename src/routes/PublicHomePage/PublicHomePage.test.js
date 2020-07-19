import React from 'react';
import ReactDOM from 'react-dom';
import PublicHomePage from './PublicHomePage';
import { BrowserRouter } from 'react-router-dom';

describe('<PublicHomePage />', () => {
    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(
      <BrowserRouter>
      <PublicHomePage/>
      </BrowserRouter>
      , div);
      ReactDOM.unmountComponentAtNode(div);
    });
    });