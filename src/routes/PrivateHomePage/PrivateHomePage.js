import React, { Component } from 'react'
import MessageContext from '../../contexts/MessagesContext'
import MessageService from '../../services/messageService'
import SingleMessage from '../../components/SingleMessage/SingleMessage'
import WelcomeName from '../../components/WelcomeName/WelcomeName';
import ThinkingLoader from '../../components/Loaders/ThinkingLoader/ThinkingLoader';

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
    const temp = messages.map((message, index) => {
      return <SingleMessage key={index} id={message.id} message={message.message} />
    })
    return temp
  }

  handleAddMessage = (message) => {
    const { submittedMessage, setError, setSubmittedMessage, clearError, setSuccess, success, toggleLoading} = this.context
    if (!message) return setError('You must include a valid message.')
    clearError()
    toggleLoading()
    MessageService.addMessage(message)
      .then(data => {
        
        setSubmittedMessage(data.message)
        toggleLoading()
        setSuccess();
      })
      .catch(err => {
        toggleLoading()
        setError(err)
      })
  }

  render() {
    const { messages, isLoading, error, success} = this.context
    return (
      <div className="div-background">
        <section className="user-greeting">
          <WelcomeName/>
        </section>
        {isLoading && <ThinkingLoader/>}
        { error && <p className="private-home-error">{error}</p> }
        { success && <p className="private-home-success">{success}</p> }
        <form className="message-form" onSubmit={ev => {
          ev.preventDefault()
          this.handleAddMessage(ev.target.message.value)
        }}>
          <label htmlFor="message">Share Positive Message</label>
          <input className="basic-input" type="text" name="message" id="message" />
          <button>Add New Message</button>
        </form>
        <section className="coin-messages-container">
          {this.generateMessages()}
        </section>
      </div>
    )
  }
}

export default PublicHomePage