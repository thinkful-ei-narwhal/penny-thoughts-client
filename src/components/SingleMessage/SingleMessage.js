import React, { Component } from 'react'
import messageService from '../../services/messageService'
import MessageContext from '../../contexts/MessagesContext';

export default class SingleMessage extends Component {
  
  static contextType = MessageContext;


  /* This was the old version of this code.  It had a bug where it did not
  keep track of unique items.  This is the kind of problem where asynch would
  work much better than a promise chain in my opinion -D.S.*/

  // updateMessage(id) { 
  //   const messages = this.context.messages;
  //   messageService.getOneRandom(id)
  //   .then(data => {
  //       this.context.changeMessage(data[0], id)
  //   })
  //   .catch(err => this.context.setError(err))
  // }

  /* this is a newer version that uses async/await.
  It takes the messages from the current state and maps them to their id's
  then it makes a call and stores it as data
  as long as it IS included in the array of id's, make a call until it's not included.
  Then set it in the context.
  No finally block needed here unless we were logging something. */

  async updateMessage(id) { 
    const messages = this.context.messages.map(m => m.id);
    try {
      let data = await messageService.getOneRandom(id)
      while (messages.includes(data[0].id)){
        data = await messageService.getOneRandom(id)
      }
      this.context.changeMessage(data[0], id)
    } catch (err) {
      this.context.setError(err)
    } finally {}
  }
  
  render() {
    return (
      <div onClick={() => this.updateMessage(this.props.id)} className="coin">{this.props.message}</div>
    )
  }
}