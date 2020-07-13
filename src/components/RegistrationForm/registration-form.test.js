import React from 'react';
import ReactDOM from 'react-dom';
import RegistrationForm from './registration-form';

describe('<RegistrationForm />', () => {
    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(
      <RegistrationForm/>
      , div);
      ReactDOM.unmountComponentAtNode(div);
    });
    });