import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Nav from './Nav';


describe('<Nav />', () => {
    it('renders without crashing', () => {
      const location = { pathname: '/register/' };
      const div = document.createElement('div');
      ReactDOM.render(
      <BrowserRouter>
      <Nav location={ location }/>
      </BrowserRouter>
      , div);
      ReactDOM.unmountComponentAtNode(div);
    });
});