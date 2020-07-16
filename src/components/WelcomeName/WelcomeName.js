import React, { Component, Fragment } from 'react';
import jwtDecode from 'jwt-decode';
import TokenService from '../../services/token-service'
import { Link } from 'react-router-dom';
import './WelcomeName.css'
export class WelcomeName extends Component {

  renderUserWelcome() {
    let user = '';

    if (TokenService.getAuthToken()) {
      user = jwtDecode(TokenService.getAuthToken()).sub
      return (
        <div className="instructions">
          <h2>{`Welcome, ${user}!`}</h2>
          <h3>Coin controls: Click to flip || Hold to report</h3>
        </div>
      )
    } else {
      return (
        <div className="instructions">
          <h2>{`You are not logged in... `}<Link to='/'>Log In Here!</Link></h2>
          <h3>Coin controls: Click to flip || Hold to report</h3>
        </div>
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
