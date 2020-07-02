import React, { Component } from 'react'
import LoginForm from '../../components/LoginForm/login-form'
import {Link} from 'react-router-dom';

export class LandingPage extends Component {
  render() {
    return (
      <div>
        <LoginForm {...this.props}/>
        <Link to='/browse'>browse</Link>
      </div>
    )
  }
}

export default LandingPage
