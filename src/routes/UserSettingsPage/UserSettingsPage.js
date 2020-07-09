import React, { Component } from 'react';
import UserMessages from '../../components/UserMessageList/UserMessageList'
import UserInfo from '../../components/UserInfo/UserInfo'
import DeleteAccountButton from '../../components/DeleteAccountButton/deleteAccount-button'

export default class UserSettingsPage extends Component {
  render() {
    return (
      <div>
        <h2 className="settings-header">Settings</h2>
        <UserMessages/>
        <UserInfo/>
        <DeleteAccountButton/>
      </div>
    )
  }
}

