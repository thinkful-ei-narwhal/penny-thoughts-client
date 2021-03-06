import React, { Component } from 'react';
import MessageContext from '../../contexts/MessagesContext';
import MessageService from '../../services/messageService';
import SingleMessage from '../../components/SingleMessage/SingleMessage';
import WelcomeName from '../../components/WelcomeName/WelcomeName';
import NewThinkingLoader from '../../components/Loaders/NewThinkingLoader/NewThinkingLoader';
import './PrivateHomePage.css'

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

  // When a user submits a message, this handles whether to display a success message or a rejection message

  handleAddMessage = (message) => {
    const { setError, setSubmittedMessage, clearError, setSuccess, toggleLoading} = this.context
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
        setError(err.error)
      })
  }

  // this renders the introduction for the user

  renderIntro() {
    const {error, success} = this.context
    return (
      <div>
      {(error || success) ? null : <div className="penny-container"><div className="penny-neutral"/><p className="penny-intro">Hi, I'm Penny!  Share your kind thoughts in the form above! I'll think about your message and approve it if it's OK!</p></div>}
      </div>)
  }


  render() {
    const { isLoading, error, success} = this.context
    return (
      <div className="home">
        <section className="user-greeting">
          <WelcomeName/>
        </section>
        
        <form className="message-form" onSubmit={ev => {
          ev.preventDefault()
          this.handleAddMessage(ev.target.message.value)
        }}>
          <label className="basic-label" htmlFor="message">
            <input className="basic-input" type="text" name="message" id="message" placeholder="Share Positive Message" />
          </label>
          <button className="submit-message">Add New Message</button>
        {isLoading ? <NewThinkingLoader/> : this.renderIntro()}
        { error && <div className="penny-container"><div className="penny-sad"/><p className="private-home-error shake-horizontal">{error} </p></div> }
        { success && <div className="penny-container"><div className="penny-happy"/><p className="private-home-success">{success}</p></div> }
        </form>
        <section className="coin-messages-container">
          {this.generateMessages()}
        </section>
      </div>
    )
  }
}

export default PublicHomePage