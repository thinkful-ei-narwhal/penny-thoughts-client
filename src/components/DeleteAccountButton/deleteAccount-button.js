import React, { Fragment , Component} from 'react'
import UserContext from '../../contexts/UserContext';
import './deleteAccount-button.css'

export class deleteAccountButton extends Component {

  static contextType = UserContext;

  render() {
    return (
    <Fragment>
      <h2 className="settings-subheader">If you'd like to delete your account, click the button below:</h2>
      <button className= 'delete-button'
      onClick={(e) => {
        e.preventDefault();
        this.context.toggleConfirm()
      }}>
        Delete Account
      </button>
    </Fragment>
    )
  }
}

export default deleteAccountButton
