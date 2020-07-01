import React from 'react';
import Demo from '../../Demo/Demo';
import './App.css';
import LoginForm from '../user/login-form';
import RegistrationForm from '../user/registration-form';

function App() {
  return (
    <div className="App">
      <Demo />
      <LoginForm />
      <RegistrationForm />
    </div>
  );
}

export default App;
