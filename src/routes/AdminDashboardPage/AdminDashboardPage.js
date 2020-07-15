import React from 'react'
import MessageContext from '../../contexts/MessagesContext'
import MessageService from '../../services/messageService'
import FlaggedMessage from '../../components/FlaggedMessage/FlaggedMessage'
import BubblesLoader from '../../components/Loaders/BubbleLoader/BubblesLoader'
import './AdminDashboardPage.css'

class AdminDashboardPage extends React.Component {
  
  static contextType = MessageContext;

  componentDidMount() {
    this.context.clearError()
    this.context.toggleLoading()
    MessageService.getFlaggedMessages()
      .then(data => {
        this.context.setFlaggedMessages(data)
        this.context.toggleLoading()
      })
      .catch(err => this.context.setError(err))  
  }

  generateFlaggedMessages() {
    const { flaggedMessages } = this.context
    const temp = flaggedMessages.map((message, index) => {
      return <FlaggedMessage key={index} id={message.id} index={index} message={message.message} />
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
        {this.context.error && <p className="private-home-error">{this.context.error}</p>}
        {this.context.success && <p className="private-home-success">{this.context.success}</p>}
          <h2>Flagged User Messages:</h2>
          <ul>
            {this.context.flaggedMessages.length > 0 ? this.generateFlaggedMessages() : <p>There are no flagged messages!</p>}
          </ul>
        </section>
      </div>
    )
  }
}

export default AdminDashboardPage;