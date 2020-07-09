import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import TokenService from '../../services/token-service';
import UserContext from '../../contexts/UserContext';
import jwtDecode from 'jwt-decode'

export class Nav extends Component {
  static contextType = UserContext;

  handleLogoutClick = () => {
    TokenService.clearAuthToken();
  }

  renderLogoutLink() {
    if (jwtDecode(TokenService.getAuthToken()).admin) {
      return (
        <div className = 'header__logged-in' >
          <NavLink  
            className='nav-link'
            onClick = { this.handleLogoutClick }
            to = '/' >
              Logout 
          </NavLink> 
          <NavLink  
            className='nav-link'
            to = '/settings' >
              Settings
          </NavLink>
          <NavLink  
            className='nav-link'
            to = '/admin' >
              Admin
          </NavLink> 
        </div>
      )
    } else {
      return (
        <div className = 'header__logged-in' >
          <NavLink  
            className='nav-link'
            onClick = { this.handleLogoutClick }
            to = '/' >
              Logout 
          </NavLink> 
          <NavLink  
            className='nav-link'
            to = '/settings' >
              Settings
          </NavLink> 
        </div>
      )
    }
  }

  renderLoginLink() {
    return ( 
      <div className = 'header__not-logged-in' >
        <NavLink 
        className='nav-link'
        to = '/register' >
          Sign Up
        </NavLink> 
      </div>
    )
  }

  render() {
    return ( 
      <nav className = 'header' >
        <div className='title-logo'>
          <NavLink to = '/' >
            <h1> Penny Thoughts </h1>
          </NavLink> 
        </div>
        <section className = 'navlinks' > 
          {
            TokenService.hasAuthToken() ?
            this.renderLogoutLink() :
            this.renderLoginLink()
          }
        </section> 
      </nav>
    )
  }
}

export default Nav;