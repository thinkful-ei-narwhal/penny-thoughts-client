import React, { Component } from 'react'
import MessageContext from '../../contexts/MessagesContext'
import MessageService from '../../services/messageService'
import BubblesLoader from '../Loaders/BubblesLoader'
export default class UserMessages extends Component {
  state = {
    newMessage: '',
    isLoading: true
  }
  static contextType = MessageContext;

  componentDidMount() {
    this.context.clearError()
    MessageService.getUserMessages()
      .then(data => {
        this.context.setUserMessages(data)
      })
      .catch(err => this.context.setError(err))
    this.context.toggleLoading()
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

  handleEditMessage = (id) => {
    // console.log(this.refs[`${id}`].value)
    this.context.clearError()
    this.context.updateUserMessage(id, this.refs[`${id}`].value)
    this.refs[`${id}`].value = '';
  }

  generateUserMessages() {
    const { userMessages } = this.context

    const temp = userMessages.map((message, index) => {
      let userMessage = message;
      return (
        <li key={index}>
          <input ref={`${message.id}`} placeholder={userMessage.message}></input>
          <button onClick={() => this.handleEditMessage(message.id)}>Edit Message</button>
          <button onClick={() => this.deleteUserMessage(userMessage)}>Delete Message</button>
        </li>
      )
    })
    return temp
  }

  render() {
    if (this.context.isLoading === true) {
      return (
        <BubblesLoader />
      )
    }
    return (
      <div>
        <section className='messages-container'>
          {(this.context.error !== 204) ? <p>{this.context.error}</p> : <div></div>}
          <p>these are your messages</p>
          <ul>
            {this.generateUserMessages()}
          </ul>
        </section>
      </div>
    )
  }
}