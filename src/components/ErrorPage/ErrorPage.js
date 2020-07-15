import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class ErrorPage extends Component {
  state = {error: null};

  static getDerivedStateFormError(error) {
    return (error)
  }
  render() {
    if (this.state.error) {
      return (
        <div className="not-found-container">
          <p className="error-404">App Error</p>
          <div className="penny-not-found"></div>
          <p className="error-message">Oops! Something went wrong with the application. Click the button below to go back while I figure out what's wrong.</p>
          <Link to='/home' className="go-back-btn">Go Back</Link>
        </div>
      )
    }
    //otherwise render the children
    return this.props.children
  }
}