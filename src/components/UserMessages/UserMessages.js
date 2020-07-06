import React, { Component } from 'react'
import MessageContext from '../../contexts/MessagesContext'
import MessageService from '../../services/messageService'

export default class UserMessages extends Component {
  static contextType = MessageContext;

  componentDidMount() {
    this.context.clearError()
    MessageService.getUserMessages()
      .then(data => {
        this.context.setUserMessages(data)
      })
      .catch(err => this.context.setError(err))
  }

  deleteUserMessage(message) {
    MessageService.deleteUserMessage(message.id)
      .then(
        MessageService.getUserMessages()
          .then(data => {
            this.context.setUserMessages(data)
          })
          .catch(err => this.context.setError(err))
      )
  }

  generateUserMessages() {
    const { userMessages } = this.context
    const temp = userMessages.map(message => {
      let userMessage = message;
      return (
        <li key={message.id}>
          <p>{userMessage.message}</p>
          <button>Edit Message</button>
          <button onClick={() => {this.deleteUserMessage(userMessage)}}>Delete Message</button>
        </li>
      )
    })
    return temp
  }

  render() {
    return (
      <div>
        <section className='messages-container'>
          <p>these are your messages</p>
          <ul>
            {this.generateUserMessages()}
          </ul>
        </section>
      </div>
    )
  }
}