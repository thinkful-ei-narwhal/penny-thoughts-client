import React, { Component } from 'react';
import MessageContext from '../../contexts/MessagesContext';
import MessageService from '../../services/messageService';
import BubblesLoader from '../Loaders/BubbleLoader/BubblesLoader';
import UserMessage from '../UserMessage/UserMessage';
import NewThinkingLoader from '../Loaders/NewThinkingLoader/NewThinkingLoader';
import './UserMessageList.css';

export default class UserMessages extends Component {

  static contextType = MessageContext;

  constructor(props) {
    super(props)
    this.state = {
      page: 1,
      pageCount: null
    }
  }

  // On mount, this gets the messages and the max pages for the user

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
            this.setState({ pageCount: this.countPages(messages) })
          })
      })
      .catch(err => this.context.setError(err))
  }

  // this counts the pages based on how many messages there are

  countPages(messages) {
    let numberOfMessages = parseInt(messages[0].count)
    let pages = Math.ceil(numberOfMessages / 10)
    return pages
  }

  generateUserMessages() {
    const { userMessages } = this.context
    const temp = userMessages.map((message, index) => {
      return <UserMessage key={index} id={message.id} index={index} message={message.message} />
    })
    return temp
  }

  // lets the user go back on the messages pagination

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

  // lets the user go forward on the messages pagination

  onNext = () => {
    this.setState({ page: this.state.page + 1 })
    MessageService.getUserMessages(this.state.page + 1)
      .then(data => {
        this.context.setUserMessages(data)
      })
      .catch(err => this.context.setError(err))
  }

  // lets the user go to the last page (might be depreciated?)

  onLast = () => {
    this.setState({ page: this.state.pageCount })
    MessageService.getUserMessages(this.state.pageCount)
      .then(data => {
        this.context.setUserMessages(data)
      })
      .catch(err => this.context.setError(err))
  }

  // lets the user click on the page number to go right to it

  onClickPageNumber = (ev) => {
    ev.preventDefault()
    this.setState({ page: parseInt(ev.target.value) })
    MessageService.getUserMessages(parseInt(ev.target.value))
      .then(data => {
        this.context.setUserMessages(data)
      })
      .catch(err => this.context.setError(err))
  }

  // various renders

  renderPageButton = (pageNumber) => {
    return <button value={pageNumber} onClick={(ev) => this.onClickPageNumber(ev)}>{pageNumber}</button>
  }

  renderPageNumbers = () => {
    const pageArray = []
    for (let i = 1; i <= this.state.pageCount; i++) {
      pageArray.push(i)
    }
    return pageArray
  }

  renderNext = () => {
    if (this.state.page === this.state.pageCount) {
      return false
    }
    return true
  }

  highlightPageNumber = (pageNumber) => {
    if (pageNumber === this.state.page) {
      return 'highlighted'
    }
    return ''
  }

  render() {
    let lastButton = 'Last (' + this.state.pageCount + ')'

    if (this.context.isLoading === true) {
      return (
        <BubblesLoader />
      )
    }
    return (
      <div>
        <section className='messages-container'>
          {this.context.isLoadingThink && <NewThinkingLoader />}
          {this.context.error && <div className="penny-container"><div className="penny-sad" /><p className="private-home-error shake-horizontal">{this.context.error} </p></div>}
          {this.context.success && <div className="penny-container"><div className="penny-happy" /><p className="private-home-success">{this.context.success}</p></div>}
          <h2 className="settings-subheader">Your User Messages:</h2>
          <ul className="message-list">
            {this.context.userMessages.length > 0 ? this.generateUserMessages() : <p>There are no messages! Make some on the home page!</p>}
          </ul>
          <div className='message-page-navigator'>
            {(this.state.page > 1) && <button onClick={() => this.onPrevious()} className='previous' value='Previous'>Previous</button>}
            {this.renderPageNumbers().map((pageNumber) => { return <button id={this.highlightPageNumber(pageNumber)} key={pageNumber} value={pageNumber} onClick={(ev) => this.onClickPageNumber(ev)}>{pageNumber}</button> })}
            {(this.renderNext()) && <button onClick={() => this.onNext()} className='next' value='Next'>Next</button>}
            {(this.renderNext()) && <button onClick={() => this.onLast()} className='last' value={lastButton}>{lastButton}</button>}
          </div>
        </section>
      </div>
    )
  }
}