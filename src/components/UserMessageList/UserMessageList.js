import React, { Component } from 'react'
import MessageContext from '../../contexts/MessagesContext'
import MessageService from '../../services/messageService'
import BubblesLoader from '../Loaders/BubbleLoader/BubblesLoader'
import UserMessage from '../UserMessage/UserMessage'
import ThinkingLoader from '../Loaders/ThinkingLoader/ThinkingLoader'

import './UserMessageList.css'

import messageService from '../../services/messageService'

export default class UserMessages extends Component {
  
  static contextType = MessageContext;

  constructor(props) {
    super(props)
    this.state = {
      page: 1,
      pageCount: null
    }
  }

  componentDidMount() {
    this.context.clearError()
    this.context.toggleLoading()
    MessageService.getUserMessages(this.state.page)
      .then(data => {
        this.context.setUserMessages(data)
        this.context.toggleLoading()
      })
      .then(() => {
        MessageService.getUserMessagePageCount()
          .then(messages => {
            this.setState({ pageCount: this.countPages(messages)})
          })
      })
      .catch(err => this.context.setError(err))  
  }

  countPages(messages) {
    let numberOfMessages = parseInt(messages[0].count)
    let pages = Math.ceil(numberOfMessages/10)
    return pages
  }

  generateUserMessages() {
    const { userMessages } = this.context
    const temp = userMessages.map((message, index) => {
      return <UserMessage key={index} id={message.id} index={index} message={message.message} />
    })
    return temp
  }

  onPrevious = () => {
    if (this.state.page === 1) {
      return
    }
    this.setState({ page: this.state.page - 1 })
    MessageService.getUserMessages(this.state.page - 1)
      .then(data => {
        this.context.setUserMessages(data)
      })
      .catch(err => this.context.setError(err))
  }

  onNext = () => {
    this.setState({ page: this.state.page + 1 })
    MessageService.getUserMessages(this.state.page + 1)
    .then(data => {
      this.context.setUserMessages(data)
    })
    .catch(err => this.context.setError(err))  
  }

  onLast = () => {
    this.setState({ page: this.state.pageCount })
    MessageService.getUserMessages(this.state.pageCount)
    .then(data => {
      this.context.setUserMessages(data)
    })
    .catch(err => this.context.setError(err)) 
  }

  onClickPageNumber = (ev) => {
    ev.preventDefault()
    this.setState({ page: parseInt(ev.target.value)})
    MessageService.getUserMessages(parseInt(ev.target.value))
      .then(data => {
        this.context.setUserMessages(data)
      })
      .catch(err => this.context.setError(err))  
  }

  renderPageNumbers = () => {
    for(let i = 0; i <= this.state.pageCount; i++) {
      return (
        <button value={i} onClick={(ev) => this.onClickPageNumber(ev)}>{i}</button>
      )
    }
  }

  renderNext = () => {
    if (this.state.page === this.state.pageCount) {
      return false
    }
    return true
  }

  render() {
    let lastButton = 'Last' + ' (' + this.state.pageCount + ')'

    if (this.context.isLoading === true) {
      return (
        <BubblesLoader />
      )
    }
    return (
      <div>
        <section className='messages-container'>
        {this.context.isLoadingThink && <ThinkingLoader/>}
        {this.context.error && <p className="private-home-error shake-horizontal">{this.context.error}</p>}
        {this.context.success && <p className="private-home-success">{this.context.success}</p>}
          <h2 className="settings-subheader">Your User Messages:</h2>
          <ul className="message-list">
            {this.context.userMessages.length > 0 ? this.generateUserMessages() : <p>There are no messages! Make some on the home page!</p>}
          </ul>
          <form onSubmit={(ev) => this.onGo(ev)} className='message-page-navigator'>
            {(this.state.page > 1) && <input onClick={() => this.onPrevious()} className='previous' type='button' value='Previous'/>}
            {this.renderPageNumbers()}
            {(this.renderNext()) && <input onClick={() => this.onNext()} className='next' type='button' value='Next'/>}
            {(this.renderNext()) && <input onClick={() => this.onLast()} className='last' type='button' value={lastButton}/>}
          </form>
        </section>
      </div>
    )
  }
}