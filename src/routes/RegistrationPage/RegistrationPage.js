import React, { Component } from 'react'
import RegistrationForm from '../../components/RegistrationForm/registration-form'

export class RegistrationPage extends Component {
  render() {
    return (
      <div>
        <RegistrationForm
          {...this.props}
        />
      </div>
    )
  }
}

export default RegistrationPage
