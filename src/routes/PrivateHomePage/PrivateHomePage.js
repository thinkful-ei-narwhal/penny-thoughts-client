import React, { Component } from 'react'
import MessageContext from '../../contexts/MessagesContext'
import MessageService from '../../services/messageService'
import SingleMessage from '../../components/SingleMessage/SingleMessage'

class PublicHomePage extends Component {
  static contextType = MessageContext;

  state = {
    success: '' 
  }

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

  handleAddMessage = (message) => {
    const { submittedMessage, setError, setSubmittedMessage, clearError, setSuccess } = this.context
    if (!message) return setError('You must include a valid message.')
    clearError()
    MessageService.addMessage(message)
      .then(data => {
        this.setState({ success: 'You successfully added your message!' })
        setSubmittedMessage(data.message)
      })
      .catch(err => {
        setError(err)
      })
  }

  render() {
    const { messages } = this.context
    return (
      <div>
        <section className="user-greeting">
          <h2>
            Welcome Mango Peterson!
          </h2>
        </section>
        { this.context.error && <p className="private-home-error">{this.context.error}</p> }
        { this.state.success.length !== 0 && <p className="private-home-success">{this.state.success}</p> }
        <form className="message-form" onSubmit={ev => {
          ev.preventDefault()
          this.handleAddMessage(ev.target.message.value)
        }}>
          <label htmlFor="message">Share Positive Message</label>
          <input className="basic-input" type="text" name="message" id="message" />
          <button>Add New Message</button>
        </form>
        <section className="messages-container">
          {this.generateMessages()}
        </section>
      </div>
    )
  }
}

export default PublicHomePage