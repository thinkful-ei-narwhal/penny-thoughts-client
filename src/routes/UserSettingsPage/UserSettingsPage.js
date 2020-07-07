import React, { Component } from 'react';
import UserMessages from '../../components/UserMessageList/UserMessageList'

export default class UserSettingsPage extends Component {
  render() {
    return (
      <div>
        <h2>Settings</h2>
        <UserMessages/>
      </div>
    )
  }
}

