import React, { Component } from 'react';
import AuthApiService from '../../services/auth-api-service';
import './registration-form.css';


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

    AuthApiService.postUser(newUser)
      .then(() => {
        this.props.history.push('/')
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }

  render() {
    return (
      <section>
      {this.state.error && <p className='private-home-error shake-horizontal'>{this.state.error}</p>}
        <form onSubmit={(e) => this.handleSubmit(e)} className='RegistrationForm'>
          <h2>Register</h2>

          <label className="register-label" htmlFor='RegisterName'>
            Full Name:
            <input className="register-input" onChange={(e) => this.handleNameChange(e)} type='text' name='RegisterName'/>
          </label>

          <label className="register-label" htmlFor='RegisterEmail'>
            E-Mail:
            <input className="register-input" onChange={(e) => this.handleEmailChange(e)} type='email' name='RegisterEmail'/>
          </label>

          <label className="register-label" htmlFor='RegisterUsername'>
            Username:
            <input className="register-input" onChange={(e) => this.handleUsernameChange(e)} type='text' name='RegisterUsername'/>
          </label>

          <label className="register-label" htmlFor='RegisterPassword'>
            Password:
            <input 
            className="register-input"
            type="password" 
            minLength="7" 
            maxLength="25" 
            required 
            onChange={(e) => this.handlePasswordChange(e)} 
            name='RegisterPassword'/>
          </label>
          
          <button className="solid-orange-btn" type='submit'>Create Account </button>
        </form>
      </section>
    )
  }
}