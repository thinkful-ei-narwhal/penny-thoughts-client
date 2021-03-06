import React, { Component } from 'react';
import UserMessageList from '../../components/UserMessageList/UserMessageList'
import UserInfo from '../../components/UserInfo/UserInfo'
import DeleteAccountButton from '../../components/DeleteAccountButton/deleteAccount-button'
import UserService from '../../services/userService';
import TokenService from '../../services/token-service';
import UserContext from '../../contexts/UserContext';
import './UserSettingsPage.css'

export default class UserSettingsPage extends Component {

  static contextType = UserContext;

  // various modal boxes for when the user deletes their account

  renderConfirm = () => {
    return (
      <div className="modal-box">
        <p>You are about to delete your personal account.
            Deleting your account means the removal of personal messages and data.
            Once deleted, you will not be able to log into your account again and you will have to create a brand new account.
        </p>
        <p>Are you sure you want to delete your account?</p>
         <button 
         className="yes-no-ok"
         onClick={() => {
              this.context.toggleConfirm()
              this.context.toggleDelete();
         }}>Yes</button>

         <button 
         className="yes-no-ok"
         onClick={() => {
          this.context.toggleConfirm()
         }}>No</button>
      </div>
    )
  }

  renderDelete = () => {
    return (
      <div className="modal-box">
         <p>Once deleted, there is no going back.  Are you sure you'd like to continue?</p>
        <button 
        className="yes-no-ok"
        onClick={() => {
          UserService.deleteUser()
            .then(() => {
            this.context.toggleDelete();
            this.context.clearUserData();
            TokenService.clearAuthToken();
            this.props.history.push('/');
          })
        }}>Yes</button>

        <button 
        className="yes-no-ok"
        onClick={() => {
          this.context.toggleDelete();
        }}>No</button>
      </div>
    )
  }
  render() {
    return (
      <div className="settings">
        {this.context.confirm && this.renderConfirm()}
        {this.context.deleteAccount && this.renderDelete()}

        <h2 className="settings-header">Settings</h2>
        <UserInfo/>
        <UserMessageList/>
        <DeleteAccountButton {...this.props}/>
      </div>
    )
  }
}

