import React from 'react';
import TokenService from '../../services/token-service';

function logoutButton(props) {
 
  return (
    <button onClick={() => {
      TokenService.clearAuthToken();
      props.history.push('/');
    }}>
      Logout
    </button>
  )
}
 
export default logoutButton;