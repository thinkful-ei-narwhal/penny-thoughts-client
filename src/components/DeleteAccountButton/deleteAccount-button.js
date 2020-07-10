import React, { Fragment , Component} from 'react'
import UserContext from '../../contexts/UserContext';


export class deleteAccountButton extends Component {

  static contextType = UserContext;

  render() {
    return (
    <Fragment>
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
