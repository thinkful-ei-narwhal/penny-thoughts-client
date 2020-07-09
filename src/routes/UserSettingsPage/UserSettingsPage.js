import React, { Component } from 'react';
import UserMessageList from '../../components/UserMessageList/UserMessageList'
import UserInfo from '../../components/UserInfo/UserInfo'
export default class UserSettingsPage extends Component {
  render() {
    return (
      <div>
        <h2 className="settings-header">Settings</h2>
        <UserMessageList/>
        <UserInfo/>
      </div>
    )
  }
}

