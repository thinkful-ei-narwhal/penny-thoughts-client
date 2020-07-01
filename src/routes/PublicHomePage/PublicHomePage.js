import React, { Component } from 'react'
import MessageContext from '../../contexts/MessagesContext'
import MessageService from '../../services/messageService'

class PublicHomePage extends Component {
  static context = MessageContext;

  componentDidMount() {
    this.context.clearError()
    MessageService.getTenRandom()
      .then(data => this.context.setMessages(data))
      .catch(err => this.context.setError(err))
  }

  render() {
    const { messages } = this.context
    console.log(this.context)
    return (
      <div>
        {
          messages.map(message => {
            return(
              <div>
                <p>{message}</p>
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default PublicHomePage
