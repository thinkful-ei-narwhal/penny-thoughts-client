import React, { Fragment , Component} from 'react'
import UserService from '../../services/userService';
import TokenService from '../../services/token-service';
import UserContext from '../../contexts/UserContext';


export class deleteAccountButton extends Component {

  static contextType = UserContext;

  render() {
    return (
      <Fragment>
    <button onClick={(e) => {
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
