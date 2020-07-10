import React, { Component } from 'react'
import UserContext from '../../contexts/UserContext'
import UserService from '../../services/userService'

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
      <form
        onSubmit={(ev) => {
          ev.preventDefault();
          this.handleSubmit(ev.target.full_name.value, ev.target.email.value);
        }
        }>
        <label htmlFor='full_name' > Full Name: </label>
        <input type='text'
          name='full_name'
          id='full_name'
          defaultValue={(this.context.userData) ? this.context.userData.full_name : null}
        />
        <label htmlFor='email' > email: </label>
        <input type='email'
          name='email'
          id='email'
          defaultValue={(this.context.userData) ? this.context.userData.email : null}
        />
        <button type='submit' value='Submit'>Submit</button>
      </form>
    )
  }
}

export default UserInfo
