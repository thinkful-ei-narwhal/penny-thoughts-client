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

  // if the user is an admin...

  renderLogoutLink() {
    if (jwtDecode(TokenService.getAuthToken()).admin) {
      return (
        <>
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
        </>
      )
    } else { // if the user is registered...
      return (
        <>
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
        </>
      )
    }
  }

  // if the user is NOT registered...

  renderLoginLink() {
    if (this.props.location.pathname === '/register') {
      return (
        <>
          <NavLink
            className='nav-link'
            to='/' >
            Sign In
          </NavLink>
        </>
      )
    }
    return (
      <>
        <NavLink
          className='nav-link'
          to='/register' >
          Sign Up
        </NavLink>
      </>
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
            <h1 className="app-name">Penny Thoughts</h1>
          </NavLink> 
        </div>
      </nav>
    )
  }
}

export default Nav;