import React, { Component } from 'react';
import UserContext from '../../contexts/UserContext';
import TokenService from '../../services/token-service';
import AuthApiService from '../../services/auth-api-service';
import {Link} from 'react-router-dom';


export default class LoginForm extends Component {

  static contextType = UserContext;

  state = {error: null}

  handleSubmitJwtAuth = ev => {
    ev.preventDefault();
    this.setState({error: null});
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
      this.setState({error: res.error})
    })
  }

  render() {
    const { error } = this.state;
    return (
      
      <form className="signup-form"
      onSubmit={this.handleSubmitJwtAuth}
      >
        <h2 className="signup-here">Sign Up Here!</h2>
        <div role='alert'>{error && <p className='red'>{error}</p>}</div>
        <div className="username">
          <label htmlFor="username">Username</label>
          <input placeholder="Username" autoComplete="username" type="text" name="username" id="username" />
        </div>
        <div className="password">
          <label htmlFor="password">Password</label>
          <input type="password" autoComplete="current-password" name="password" id="password" />
        </div>
        <button type="submit">Log In</button>
        <p>Not A Member? </p>
        <Link to='/register'>Register Here</Link>
      </form>
    );
  };
};