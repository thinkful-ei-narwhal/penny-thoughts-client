import React, { Component } from 'react'
import LoginForm from '../../components/LoginForm/login-form'
import {Link} from 'react-router-dom';
import './LandingPage.css';


export class LandingPage extends Component {
  render() {
    return (
      <div className="landing-page">
        <div className="landing-desc">
          <h2 className="landing-subheader">About Penny Thoughts:</h2>
          <p className="landing-description">Penny Thoughts is an app that allows users to share and view positive, motivational statements. With today's quarantine keeping people at home, Penny Thoughts helps bring positivity to users by showing them positive statements. Sign up and begin reaping the benefits of positivity.</p> 
          <div className="penny"/>
          <div className="penny-desc">
            <p className="landing-description">Hello!  My name is Penny!  I'm an Artificial Intelligence built to filter messages so that we can all share our positive motivations safely!  I'm made using TensorFlow.js and a pre-built Toxicity model, but I'm not perfect!  Sometimes things slip through, so apologies in advance!</p> 
          </div>
        </div>
        <div className="landing-login-container">
          <Link className="get-inspired" to='/browse'>Get Inspired Here!</Link>
          <h2 className="landing-sub-subheader">Or...</h2>
          <LoginForm {...this.props}/>
          <p>You can also log in with these credentials:</p>
          <p>Username: Guest</p>
          <p>Password: $4PpPpPp</p>
        </div>
      </div>
    )
  }
}

export default LandingPage
