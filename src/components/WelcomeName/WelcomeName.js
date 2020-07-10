import React, { Component, Fragment } from 'react';
import jwtDecode from 'jwt-decode';
import TokenService from '../../services/token-service'
import './WelcomeName.css'

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
        <h2>{`Click the Login Button to Log In!`}</h2>
      )
    }
  }

  render() {
    return (
      <div className="welcome">{this.renderUserWelcome()}</div>
    )
  }
}

export default WelcomeName
