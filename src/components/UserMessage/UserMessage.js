import React, { Component } from 'react'
import MessageService from '../../services/messageService'
import MessageContext from '../../contexts/MessagesContext'
import './UserMessage.css'
export class UserMessage extends Component {

  static contextType = MessageContext;

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
        <label className="hidden-label" htmlFor="message">Edit Message #{this.props.index + 1}</label>
        <input ref={`${this.props.id}`} defaultValue={this.props.message} className="basic-input"></input>
        <button onClick={() => this.handleEditMessage(this.props.id)}>Edit Message</button>
        <button onClick={() => this.deleteUserMessage(this.props.id)}>Delete Message</button>
      </li>
    )
  }
}

export default UserMessage
