import React, { Component } from 'react'
import LoginForm from '../../components/LoginForm/login-form'

export class LandingPage extends Component {
  render() {
    return (
      <div>
        <LoginForm {...this.props}/>
      </div>
    )
  }
}

export default LandingPage
