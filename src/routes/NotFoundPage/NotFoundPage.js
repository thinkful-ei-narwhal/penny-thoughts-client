import React, { Component } from 'react'
import './NotFoundPage.css'
import { Link } from 'react-router-dom'

export class NotFoundPage extends Component {
  render() {
    return (
      <div className="not-found-container">
        <p className="error-404">404 Not Found</p>
        <div className="penny-not-found"></div>
        <p className="error-message">What you're looking for is not found! Click the button below to go back.</p>
        <Link to='/home' className="go-back-btn">Go Back</Link>
      </div>
    )
  }
}

export default NotFoundPage
