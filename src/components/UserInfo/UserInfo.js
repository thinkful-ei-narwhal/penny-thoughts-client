import React, { Component } from 'react'
import UserContext from '../../contexts/UserContext'
import jwtDecode from 'jwt-decode';
import TokenService from '../../services/token-service'
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
 
    render() {
        return (
            <form>
                <label htmlFor = 'full_name' > Full Name: </label> 
                <input type = 'text'
                 name = 'full_name'
                 id = 'full_name'
                 defaultValue = { this.context.userData.full_name}
                //onChange = {(e) => this.updateName(e.target.value)}
          />       
          <label htmlFor = 'email' > email: </label> 
                <input type = 'email'
                 name = 'email'
                 id = 'email'
                defaultValue = { this.context.userData.email }
                //onChange = {(e) => this.updateName(e.target.value)}
          />
            </form>
        )
    }
}

export default UserInfo
