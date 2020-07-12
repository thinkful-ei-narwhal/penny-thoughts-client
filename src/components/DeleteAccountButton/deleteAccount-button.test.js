import React from 'react';
import ReactDOM from 'react-dom';
import DeleteAccountButton from './deleteAccount-button';

describe('<DeleteAccountButton />', () => {
    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(
      <DeleteAccountButton/>
      , div);
      ReactDOM.unmountComponentAtNode(div);
    });
    });