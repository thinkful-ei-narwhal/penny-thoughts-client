import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import TokenService from '../../services/token-service';
import UserContext from '../../contexts/UserContext';

export class Nav extends Component {
  static contextType = UserContext;

  handleLogoutClick = () => {
    TokenService.clearAuthToken();
    this.context.clearAuthToken();
  }

  renderLogoutLink() {
    return ( 
      <div className = 'header__logged-in' >
        <NavLink 
          onClick = { this.handleLogoutClick }
          to = '/' >
            Logout 
        </NavLink> 
      </div>
    )
  }

  renderLoginLink() {
    return ( 
      <div className = 'header__not-logged-in' >
        <NavLink to = '/register' >
          Sing Up
        </NavLink> 
      </div>
    )
  }

  render() {
    return ( 
      <nav className = 'header' >
        <NavLink to = '/' >
          <h2 > Penny Thoughts </h2>
        </NavLink> 
        <section className = 'navlinks' > {
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