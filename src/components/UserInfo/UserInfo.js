import React, { Component } from 'react'
import UserContext from '../../contexts/UserContext'
import jwtDecode from 'jwt-decode';
import TokenService from '../../services/token-service'
import UserService from '../../services/userService'

export class UserInfo extends Component {
    static contextType = UserContext;

    componentDidMount() {
        let user = jwtDecode(TokenService.getAuthToken())
        this.context.clearError()
        UserService.getUser(user.user_id)
          .then(data => {
            this.context.setUser(data)
          })
          .catch(err => this.context.setError(err))
      }
 
    render() {
        let user = jwtDecode(TokenService.getAuthToken())
        return (
            <form>
                {/* full_name username email */}
                <label htmlFor = 'full_name' > Full Name: </label> 
                <input type = 'text'
                 name = 'full_name'
                 id = 'full_name'
                 defaultValue = { user.sub}
                //onChange = {(e) => this.updateName(e.target.value)}
          />
            <label htmlFor = 'username' > Username: </label> 
                <input type = 'text'
                 name = 'username'
                 id = 'username'
                //  defaultValue = { this.context.user.username }
                //onChange = {(e) => this.updateName(e.target.value)}
          />
          
          <label htmlFor = 'email' > email: </label> 
                <input type = 'email'
                 name = 'email'
                 id = 'email'
                //  defaultValue = { this.context.user.email }
                //onChange = {(e) => this.updateName(e.target.value)}
          />

            </form>
        )
    }
}

export default UserInfo
