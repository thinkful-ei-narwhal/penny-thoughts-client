import React, { Component } from 'react'
import MessageContext from '../../contexts/MessagesContext'
import messageService from '../../services/messageService'
import './FlaggedMessage.css'

export class FlaggedMessage extends Component {


  // These are the messages for the admin view.

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
      <li key={this.props.id} className="admin-usermessage">
        <label className="hidden-label" htmlFor="message">Message #{this.props.index + 1}</label>
        <textarea ref={`${this.props.id}`} defaultValue={this.props.message}></textarea>
        <div className="admin-buttons">
          <button className="admin-btn" onClick={() => this.handleUnflagMessage(this.props.id)}>Unflag</button>
          <button className="admin-btn" onClick={() => this.handleArchiveMessage(this.props.id)}>Archive</button>
        </div>
      </li>
    )
  }
}

export default FlaggedMessage
