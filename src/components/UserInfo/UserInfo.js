import React, { Component, Fragment } from 'react'
import UserContext from '../../contexts/UserContext'
import UserService from '../../services/userService'
import './UserInfo.css'

export class UserInfo extends Component {
  static contextType = UserContext;

  componentDidMount() {
    this.context.clearError()
    UserService.getUser()
      .then(data => {
        this.context.setUserData(data)
      })
      .catch(err => this.context.setError(err))
  }

  handleSubmit = (fullName, email) => {
    this.context.clearError()
    UserService.editUser(fullName, email)
      .then(data => {
        this.context.setUserData(data)
      })
      .catch(err => this.context.setError(err))
  }

  render() {
    return (
      <div className="user-info-container">
        <h2 className="settings-subheader">Edit Your User Information:</h2>
        <form
          className= 'user_data'
          onSubmit={(ev) => {
            ev.preventDefault();
            this.handleSubmit(ev.target.full_name.value, ev.target.email.value);
          }
          }>
          <label htmlFor='full_name'>Full Name: </label>
          <input className="user-input" type='text'
            name='full_name'
            id='full_name'
            defaultValue={(this.context.userData) ? this.context.userData.full_name : null}
          />
          <label htmlFor='email'>Email: </label>
          <input className="user-input" type='email'
            name='email'
            id='email'
            defaultValue={(this.context.userData) ? this.context.userData.email : null}
          />
          <button type='submit' value='Submit' className='user-info-submit'>Submit</button>
        </form>
      </div>
    )
  }
}

export default UserInfo
