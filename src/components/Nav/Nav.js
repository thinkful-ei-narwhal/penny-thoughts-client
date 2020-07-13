import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import TokenService from '../../services/token-service';
import UserContext from '../../contexts/UserContext';
import jwtDecode from 'jwt-decode';
import './Nav.css';


export class Nav extends Component {
  static contextType = UserContext;

  handleLogoutClick = () => {
    TokenService.clearAuthToken();
    this.context.clearUserData();
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
    if (this.props.location.pathname === '/register') {
      return (
        <div className='header__not-logged-in' >
          <NavLink
            className='nav-link'
            to='/' >
            Sign In
          </NavLink>
        </div>
      )
    }
    return (
      <div className='header__not-logged-in' >
        <NavLink
          className='nav-link'
          to='/register' >
          Sign Up
        </NavLink>
      </div>
    )
  }

  /* title functionality */

  render() {
    return ( 
      <nav className="header" >
        <section className="navlinks" > 
          {
            TokenService.hasAuthToken() ?
              this.renderLogoutLink() :
              this.renderLoginLink()
          }
        </section>
        <div className="title-logo">
          <NavLink to = '/' >
            <h1 className="jiggle"> Penny Thoughts </h1>
          </NavLink> 
        </div>
      </nav>
    )
  }
}

export default Nav;