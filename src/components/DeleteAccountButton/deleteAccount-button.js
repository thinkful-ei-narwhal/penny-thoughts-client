import React from 'react';
import UsersService from '../../services/userService';
import UserService from '../../services/userService';

function deleteAccountButton(props) {
 
  return (
    <button onClick={() => {
      UserService.deleteUser();
      props.history.push('/');
    }}>
      Delete Account
    </button>
  )
}
 
export default deleteAccountButton;