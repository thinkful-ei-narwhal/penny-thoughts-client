import React, { Component } from 'react'
import MessageContext from '../../contexts/MessagesContext'
import messageService from '../../services/messageService'

export class FlaggedMessage extends Component {

  static contextType = MessageContext;

  handleUnflagMessage = (id) => {
    messageService.unflagMessage(id)
      .then(res => {
        this.context.unflagMessage(id)
      })
  }

  handleArchiveMessage = (id) => {
    messageService.archiveMessage(id)
      .then(res => {
        this.context.archiveMessage(id)
      })
  }

  render() {
    return (
      <li key={this.props.id} className="usermessage">
        <label className="hidden-label" htmlFor="message">Message #{this.props.index + 1}</label>
        <input ref={`${this.props.id}`} defaultValue={this.props.message}></input>
        <button onClick={() => this.handleUnflagMessage(this.props.id)}>Unflag Message</button>
        <button onClick={() => this.handleArchiveMessage(this.props.id)}>Archive Message</button>
      </li>
    )
  }
}

export default FlaggedMessage
