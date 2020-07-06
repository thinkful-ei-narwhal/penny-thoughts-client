import React, { Component } from 'react'
import messageService from '../../services/messageService'
import MessageContext from '../../contexts/MessagesContext';

export default class SingleMessage extends Component {
  
  static contextType = MessageContext;

  updateMessage(id) {
    messageService.getOneRandom()
    .then(data => {
      this.context.changeMessage(data[0], id)
    })
    .catch(err => this.context.setError(err))
  }
  
  render() {
    return (
      <div onClick={() => this.updateMessage(this.props.id)} className="coin">{this.props.message}</div>
    )
  }
}