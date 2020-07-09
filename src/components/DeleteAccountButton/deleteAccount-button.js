import React, { Fragment , Component} from 'react'
import UserService from '../../services/userService';
import UserContext from '../../contexts/UserContext'


export class deleteAccountButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirm: false,
      deleteAccount: false,
    };
  }
  toggleConfirm = () => {
    this.setState({
      confirm: !this.state.confirm
    });
  }
  toggleDelete = () => {
    this.setState({
      deleteAccount: !this.state.deleteAccount
    });
  }

  renderConfirm = () => {
    return (
      <div className="modal-box">
        <p>Are you sure you'd like to Delete this account?</p>
         <button onClick={() => {
             this.toggleConfirm()
             this.toggleDelete();
         }}>Yes</button>

         <button onClick={() => {
          this.toggleConfirm()
         }}>No</button>
      </div>
    )
  }

  renderDelete = () => {
    return (
      <div className="modal-box">
         <p>Are you sure there is no going back?</p>
        <button onClick={() => {
          UserService.deleteAccount()
            .then(() => {
            this.toggleConfirm()
            this.toggleDelete();
          })
        }}>Yes</button>

        <button onClick={() => {
          this.toggleDelete();
        }}>No</button>
      </div>
    )
  }

  render() {
    return (
      <Fragment>
    <button onClick={(e) => {
       e.preventDefault();
       this.toggleConfirm()
      // UserService.deleteUser();
      // props.history.push('/');
    }}>
      Delete Account
    </button>
    {this.state.confirm && this.renderConfirm()}
    {this.state.deleteAccount && this.renderDelete()}
    </Fragment>
    )
  }
}

export default deleteAccountButton
