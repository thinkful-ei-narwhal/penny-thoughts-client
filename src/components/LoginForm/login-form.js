import React, { Component } from 'react';
import UserContext from '../../contexts/UserContext';
import TokenService from '../../services/token-service';
import AuthApiService from '../../services/auth-api-service';
import { Link } from 'react-router-dom';
import './login-form.css'



export default class LoginForm extends Component {

  static contextType = UserContext;

  state = { error: null }

  handleSubmitJwtAuth = ev => {
    ev.preventDefault();
    this.setState({ error: null });
    const { username, password } = ev.target

    AuthApiService.postLogin({
      username: username.value,
      password: password.value,
    })
      .then(res => {
        username.value = ''
        password.value = ''
        TokenService.saveAuthToken(res.authToken)
        this.props.history.push('/home')
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }

  render() {
    const { error } = this.state;
    return (

      <form className="signup-form"
        onSubmit={this.handleSubmitJwtAuth}
      >
        <h2 className="signup-here">Sign In Here!</h2>
        <div role='alert'>{error && <p className='private-home-error shake-horizontal'>{error}</p>}</div>
        <div className="form-field">
          <label htmlFor="username">Username</label>
          <input placeholder="Username" autoComplete="username" type="text" name="username" id="username" />
        </div>
        <div className="form-field">
          <label htmlFor="password">Password</label>
          <input placeholder="Password" type="password" autoComplete="current-password" name="password" id="password" />
        </div>
        <button type="submit" className="solid-orange-btn">Log In</button>
        <p className="redirect-user">Not A Member? </p>
        <Link to='/register'>Register Here</Link>
      </form>
    );
  };
};