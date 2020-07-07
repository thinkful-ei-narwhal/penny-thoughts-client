import React, { Component } from 'react'
import MessageService from '../../services/messageService'
import MessageContext from '../../contexts/MessagesContext'

export class UserMessage extends Component {

  static contextType = MessageContext;


  handleEditMessage = (id) => {
    const message = this.refs[`${id}`].value;
    const { setError, updateUserMessage, clearError, setSuccess, success} = this.context
    if (!message) return setError('You must include a valid message.')
    clearError()
    MessageService.editUserMessage(id, message)
      .then(() => {
        updateUserMessage(id, message)
        setSuccess();
      })
      .catch(err => {
        setError(err)
      })
  }

  deleteUserMessage = (id) => {
    this.context.deleteUserMessage(id)
  }

  render() {
    return (
      <li>
        <label className="hidden-label" htmlFor="message">Edit Message #{this.props.index + 1}</label>
        <input ref={`${this.props.id}`} defaultValue={this.props.message}></input>
        <button onClick={() => this.handleEditMessage(this.props.id)}>Edit Message</button>
        <button onClick={() => this.deleteUserMessage(this.props.id)}>Delete Message</button>
      </li>
    )
  }
}

export default UserMessage
