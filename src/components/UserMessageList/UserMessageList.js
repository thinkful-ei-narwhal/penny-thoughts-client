import React, { Component } from 'react'
import MessageContext from '../../contexts/MessagesContext'
import MessageService from '../../services/messageService'
import BubblesLoader from '../Loader/BubblesLoader'
import UserMessage from '../UserMessage/UserMessage'
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
    console.log(userMessages);
    const temp = userMessages.map((message, index) => {
      return <UserMessage key={index} id={message.id} index={index} message={message.message} />
    })
    return temp
  }

  render() {
    console.log(this.context.success);
    if (this.context.isLoading === true) {
      return (
        <BubblesLoader />
      )
    }
    return (
      
      <div>
        <section className='messages-container'>
        {this.context.error && <p className="private-home-error">{this.context.error}</p>}
        {this.context.success && <p className="private-home-success">{this.context.success}</p>}
          <p>these are your messages</p>
          <div>
            {this.generateUserMessages()}
          </div>
        </section>
      </div>
    )
  }
}