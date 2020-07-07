import React, { Component } from 'react'
import MessageService from '../../services/messageService'
import MessageContext from '../../contexts/MessagesContext'

export class UserMessage extends Component {

  static contextType = MessageContext;


  handleEditMessage = (id, message) => {
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

  deleteUserMessage(id) {
    MessageService.deleteUserMessage(id)
      .then(
        MessageService.getUserMessages()
          .then(data => {
            this.context.setUserMessages(data)
          })
          .catch(err => this.context.setError(err))
      )
  }

  render() {
    return (
      <div>
        <form onSubmit={(e) => {
          e.preventDefault();
          this.handleEditMessage(this.props.id, e.target.message.value)}}>
          <label className="hidden-label" htmlFor="message">Edit Message #{this.props.index + 1}</label>
          <input type="text" name="message" id="message" defaultValue={this.props.message}/>
          <button type="submit">Edit Message</button>
          <button onClick={() => this.deleteUserMessage(this.props.id)}>Delete Message</button>
        </form>
      </div>
    )
  }
}

export default UserMessage
