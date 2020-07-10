import React, { Component } from 'react'
import MessageContext from '../../contexts/MessagesContext'
import MessageService from '../../services/messageService'
import BubblesLoader from '../Loaders/BubbleLoader/BubblesLoader'
import UserMessage from '../UserMessage/UserMessage'
import ThinkingLoader from '../Loaders/ThinkingLoader/ThinkingLoader'
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
          .then(pageCount => {
            this.setState({ pageCount: pageCount })
          })
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
  onLast = () => {}
  onGo = (ev) => {
    ev.preventDefault();
    const { goToPage } = ev.target;
    this.setState({ page: parseInt(goToPage.value)})
    MessageService.getUserMessages(parseInt(goToPage.value))
      .then(data => {
        this.context.setUserMessages(data)
      })
      .catch(err => this.context.setError(err))  
  }

  render() {
    console.log(this.state.pageCount)
    if (this.context.isLoading === true) {
      return (
        <BubblesLoader />
      )
    }
    return (
      <div>
        <section className='messages-container'>
          {this.context.isLoadingThink && <ThinkingLoader/>}
          {this.context.error && <p className="private-home-error">{this.context.error.message}</p>}
          {this.context.success && <p className="private-home-success">{this.context.success.message}</p>}
          <h2>Your User Messages:</h2>
          <ul>
            {this.generateUserMessages()}
          </ul>
          <form onSubmit={(ev) => this.onGo(ev)} className='message-page-navigator'>
            <input onClick={() => this.onPrevious()} className='previous' type='button' value='Previous'/>
            <input onClick={() => this.onNext()} className='next' type='button' value='Next'/>
            <input className='go' type='submit' value='Go'/>
            <input type='text' name='goToPage'/>
            <input onClick={() => this.onLast()} className='last' type='button' value='Last'/>
          </form>
        </section>
      </div>
    )
  }
}