import React, { Component } from 'react';
import UserMessages from '../../components/UserMessageList/UserMessageList'
import UserInfo from '../../components/UserInfo/UserInfo'
export default class UserSettingsPage extends Component {
  render() {
    return (
      <div>
        <h2>Settings</h2>
        <UserMessages/>
        <UserInfo/>
      </div>
    )
  }
}

