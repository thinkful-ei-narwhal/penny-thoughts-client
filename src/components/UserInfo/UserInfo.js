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
        console.log(fullName)
        console.log(email)
      }
 
    render() {
        return (
            <form
            onSubmit = {(ev) => {
                ev.preventDefault();
                this.handleSubmit(ev.target.full_name.value,ev.target.email.value);
              }
            }>
                <label htmlFor = 'full_name' > Full Name: </label> 
                <input type = 'text'
                 name = 'full_name'
                 id = 'full_name'
                //  ref={`${this.props.id}`}
                 defaultValue = { this.context.userData.full_name}
          />       
          <label htmlFor = 'email' > email: </label> 
                <input type = 'email'
                 name = 'email'
                 id = 'email'
                defaultValue = { this.context.userData.email }
          />
          <button type = 'submit' value = 'Submit'>Submit</button>
            </form>
        )
    }
}

export default UserInfo
