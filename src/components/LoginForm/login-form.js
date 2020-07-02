import React, { Component } from 'react';
import { UserContext } from '../../contexts/UserContext';
import TokenService from '../../services/token-service';
import AuthApiService from '../../services/auth-api-service';


export default class LoginForm extends Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: null
    }
  }

  handleUsernameChange = (e) => {
    e.preventDefault()
    this.setState({username: e.target.value})
  }

  handlePasswordChange = (e) => {
    e.preventDefault()
    this.setState({password: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.setState({ error: null })
    const username = this.state.username
    const password = this.state.password
    
    AuthApiService.postLogin({
      username: username,
      password: password
    })
      .then(res => {
        this.setState({
          username: '',
          password: ''
        })
        TokenService.saveAuthToken(res.authToken)
        this.context.processLogin(res.authToken)
        this.props.history.push('/home');
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }
  render() {
    return (
      <section>
        <h2>Login</h2>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <label htmlFor='Username'>
            Username:
            <input onChange={(e) => this.handleUsernameChange(e)} type='text' name='Username'/>
          </label>

          <label htmlFor='Password'>
            Password:
            <input onChange={(e) => this.handlePasswordChange(e)} type='text' name='Password'/>
          </label>

          <input type='submit' value="Login"/>
        </form>
      </section>
    )
  }
}