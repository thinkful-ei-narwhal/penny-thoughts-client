import React, { Component } from 'react'
import MessageContext from '../../contexts/MessagesContext'
import MessageService from '../../services/messageService'
import SingleMessage from '../../components/SingleMessage/SingleMessage'
import DeleteAccountButton from '../../components/DeleteAccountButton/deleteAccount-button'
import LogoutButton from '../../components/LogoutButton/logout-button'

class PublicHomePage extends Component {
  static contextType = MessageContext;

  componentDidMount() {
    this.context.clearError()
    MessageService.getTenRandom()
      .then(data => {
        this.context.setMessages(data)
      })
      .catch(err => this.context.setError(err))
  }

  generateMessages() {
    const { messages } = this.context
    const temp = messages.map(message => {
      return <SingleMessage key={message.id} message={message.message} />
    })
    return temp
  }

  render() {
    const { messages } = this.context
    console.log(messages)
    return (
      <div>
        <DeleteAccountButton {...this.props}/>
        <LogoutButton {...this.props}/>
        <section class="user-greeting">
          <h2>
            Welcome Mango Peterson!
          </h2>
        </section>
        <form class="message-form">
          <label for="message">Share Positive Message</label>
          <input class="basic-input" type="text" name="message" id="message" />
          <button>Add New Message</button>
        </form>
        <section class="messages-container">
          {this.generateMessages()}
        </section>
      </div>
    )
  }
}

export default PublicHomePage