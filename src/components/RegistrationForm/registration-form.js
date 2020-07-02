import React, { Component } from 'react';
import AuthApiService from '../../services/auth-api-service';

export default class RegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      username: '',
      password: '',
      error: null
    }
  }

  handleNameChange = (e) => {
    e.preventDefault()
    this.setState({name: e.target.value})
  }

  handleEmailChange = (e) => {
    e.preventDefault()
    this.setState({email: e.target.value})
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

    const newUser = {
      full_name: this.state.name,
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      admin: false
    }

    const newUserLogin = { 
      username: this.state.username,
      password: this.state.password
    }

    AuthApiService.postUser(newUser)
      .then(() => {
        this.props.history.push('/')
      })
      .catch(res => {
        this.setState({ error: res.error })
        console.log(this.state.error)
      })
  }

  render() {
    return (
      <section>
        <h2>Register</h2>
        <form onSubmit={(e) => this.handleSubmit(e)} className='RegistrationForm'>

          <label htmlFor='RegisterName'>
            Full Name:
            <input onChange={(e) => this.handleNameChange(e)} type='text' name='RegisterName'/>
          </label>

          <label htmlFor='RegisterEmail'>
            E-Mail:
            <input onChange={(e) => this.handleEmailChange(e)} type='text' name='RegisterEmail'/>
          </label>

          <label htmlFor='RegisterUsername'>
            Username:
            <input onChange={(e) => this.handleUsernameChange(e)} type='text' name='RegisterUsername'/>
          </label>

          <label htmlFor='RegisterPassword'>
            Password:
            <input onChange={(e) => this.handlePasswordChange(e)} type='text' name='RegisterPassword'/>
          </label>

          <input type='submit' value="Create Account" />
        </form>
      </section>
    )
  }
}