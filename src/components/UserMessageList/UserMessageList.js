import React, { Component } from 'react'
import MessageContext from '../../contexts/MessagesContext'
import MessageService from '../../services/messageService'
import BubblesLoader from '../Loaders/BubbleLoader/BubblesLoader'
import UserMessage from '../UserMessage/UserMessage'
import ThinkingLoader from '../Loaders/ThinkingLoader/ThinkingLoader'
export default class UserMessages extends Component {
  
  static contextType = MessageContext;

  componentDidMount() {
    this.context.clearError()
    this.context.toggleLoading()
    MessageService.getUserMessages()
      .then(data => {
        this.context.setUserMessages(data)
        this.context.toggleLoading()
      })
      .catch(err => this.context.setError(err))  
  }

  generateUserMessages() {
    const { userMessages } = this.context
    const temp = userMessages.map((message, index) => {
      return <UserMessage key={index} id={message.id} index={index} message={message.message} />
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
        {this.context.isLoadingThink && <ThinkingLoader/>}
        {this.context.error && <p className="private-home-error">{this.context.error}</p>}
        {this.context.success && <p className="private-home-success">{this.context.success}</p>}
          <h2 className="settings-subheader">Your User Messages:</h2>
          <ul>
            {this.generateUserMessages()}
          </ul>
        </section>
      </div>
    )
  }
}