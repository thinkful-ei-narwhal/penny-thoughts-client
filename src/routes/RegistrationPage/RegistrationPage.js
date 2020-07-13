import React, { Component } from 'react'
import RegistrationForm from '../../components/RegistrationForm/registration-form'
import Footer from '../../components/Footer/Footer'

export class RegistrationPage extends Component {
  render() {
    return (
      <div>
        <RegistrationForm
          {...this.props}
        />
        <Footer/>
      </div>
    )
  }
}

export default RegistrationPage
