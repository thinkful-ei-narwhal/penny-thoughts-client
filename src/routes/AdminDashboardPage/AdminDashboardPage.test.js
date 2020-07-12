import React from 'react';
import ReactDOM from 'react-dom';
import AdminDashboardPage from './AdminDashboardPage';

describe('<AdminDashboardPage />', () => {
    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(
      <AdminDashboardPage/>
      , div);
      ReactDOM.unmountComponentAtNode(div);
    });
    });