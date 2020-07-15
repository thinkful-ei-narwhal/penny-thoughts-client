import React, { Component, Fragment} from 'react';
import jwtDecode from 'jwt-decode';
import TokenService from '../../services/token-service'
import {Link} from 'react-router-dom';

export class WelcomeName extends Component {

  renderUserWelcome() {
    let user = '';

    if (TokenService.getAuthToken()){
      user = jwtDecode(TokenService.getAuthToken()).sub
      return (
        <h2>{`Welcome, ${user}!`}</h2>
      )
    } else {
      return (
        <h2>{`Click the Login Button to `}<Link to='/'>Log In!</Link></h2>
      )
    }
  }

  render() {
    return (
      <Fragment>{this.renderUserWelcome()}</Fragment>
    )
  }
}

export default WelcomeName
