import React from 'react';
import TokenService from '../../services/token-service';
import UserContext from '../../contexts/UserContext'
function logoutButton(props) {

  return (
    <UserContext.Consumer>
      {
        (context) => (
          <button onClick={() => {
            TokenService.clearAuthToken();
            context.clearUserData();
            console.log('we got in')
            props.history.push('/');
          }}>
            Logout
          </button>
        )
      }
    </UserContext.Consumer>
  )
}

export default logoutButton;