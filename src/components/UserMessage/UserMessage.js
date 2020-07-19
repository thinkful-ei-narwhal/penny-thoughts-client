import React, { Component } from 'react'
import MessageService from '../../services/messageService'
import MessageContext from '../../contexts/MessagesContext'
import './UserMessage.css'
export class UserMessage extends Component {

  static contextType = MessageContext;

  /* by setting the ref to the id, we can get its value similar to jQuery 
  without interfering with the DOM or needing to store input in state */

  handleEditMessage = (id) => {
    const message = this.refs[`${id}`].value;
    const { setError, updateUserMessage, clearError, setSuccess, toggleLoadingThink } = this.context
    if (!message) return setError('You must include a valid message.')
    clearError()
    toggleLoadingThink()
    MessageService.editUserMessage(id, message)
      .then(() => {
        toggleLoadingThink()
        updateUserMessage(id, message)
        setSuccess();
      })
      .catch(err => {
        toggleLoadingThink()
        setError(err.error)
      })
  }

  deleteUserMessage = (id) => {
    MessageService.deleteUserMessage(id)
      .then(() => {
        this.context.setFilterMessages(id)
      })
      .catch(err => this.context.setError(err))
  }

  render() {
    return (
      <li key={this.props.id} className="usermessage">
        <label className="hidden-label" htmlFor="message">Message #{this.props.index + 1}</label>
        <textarea ref={`${this.props.id}`} defaultValue={this.props.message} className="basic-textarea"></textarea>
        <div className="edit-message-buttons">
          <button onClick={() => this.handleEditMessage(this.props.id)}>Edit</button>
          <button onClick={() => this.deleteUserMessage(this.props.id)}>Delete</button>
        </div>
      </li>
    )
  }
}

export default UserMessage
