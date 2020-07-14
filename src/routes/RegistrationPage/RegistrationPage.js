import React, { Component } from 'react'
import RegistrationForm from '../../components/RegistrationForm/registration-form'
import './RegistrationPage.css'


export class RegistrationPage extends Component {
  render() {
    return (
      <div className="registration-form-container">
        <RegistrationForm
          {...this.props}
        />
      </div>
    )
  }
}

export default RegistrationPage
