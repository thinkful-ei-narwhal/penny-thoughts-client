import React, { Component } from 'react'
import MessageContext from '../../contexts/MessagesContext'
import MessageService from '../../services/messageService'
import SingleMessage from '../../components/SingleMessage/SingleMessage'
import WelcomeName from '../../components/WelcomeName/WelcomeName';
import './PublicHomePage.css'
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

  render() {
    return (
      <div>
        <main>
          <section className="user-greeting">
            <WelcomeName/>
          </section>
          <section className="coin-messages-container public">
            {this.generateMessages()}
          </section>
        </main>
      </div>
    )
  }
}

export default PublicHomePage
