import React, { Component } from 'react'
import LoginForm from '../../components/LoginForm/login-form'
import {Link} from 'react-router-dom';

export class LandingPage extends Component {
  render() {
    return (
      <div className="landing-page">
        <div className="landing-desc">
          <h2 className="landing-subheader">About Penny Thoughts:</h2>
          <p>Penny Thoughts is an app that allows users to share and view positive, motivational statements. With today's quarantine keeping people at home, Penny Thoughts helps bring positivity to users by showing them positive statements. Sign up and begin reaping the benefits of positivity.</p> 
          <Link className="get-inspired" to='/browse'>Get Inspired Here!</Link>
          <h2 className="landing-sub-subheader">Or...</h2>
        </div>
        <LoginForm {...this.props}/>
      </div>
    )
  }
}

export default LandingPage
