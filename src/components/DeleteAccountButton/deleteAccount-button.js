import React, { Fragment , Component} from 'react'
import UserService from '../../services/userService';
import TokenService from '../../services/token-service';
import UserContext from '../../contexts/UserContext';


export class deleteAccountButton extends Component {

  static contextType = UserContext;

  renderConfirm = () => {
    return (
      <div className="modal-box">
        <p>Are you sure you'd like to Delete this account?</p>
         <button onClick={() => {
              this.context.toggleConfirm()
              this.context.toggleDelete();
         }}>Yes</button>

         <button onClick={() => {
          this.context.toggleConfirm()
         }}>No</button>
      </div>
    )
  }

  renderDelete = () => {
    return (
      <div className="modal-box">
         <p>Are you sure there is no going back?</p>
        <button onClick={() => {
          UserService.deleteUser()
            .then(() => {
            this.context.toggleDelete();
            TokenService.clearAuthToken();
            this.props.history.push('/');
          })
        }}>Yes</button>

        <button onClick={() => {
          this.context.toggleDelete();
        }}>No</button>
      </div>
    )
  }

  render() {
    return (
      <Fragment>
    <button onClick={(e) => {
       e.preventDefault();
       this.context.toggleConfirm()
    }}>
      Delete Account
    </button>
    {this.context.confirm && this.renderConfirm()}
    {this.context.deleteAccount && this.renderDelete()}
    </Fragment>
    )
  }
}

export default deleteAccountButton
