import React, {Component } from 'react';

const MessagesContext = React.createContext({
  messages: []
});

export default MessagesContext;

export class MessageProvider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: []
    }
  }
  render() {
    const value = {
      messages: this.state.messages
    }

    return (
      <MessagesContext.Provider value={value}>
        {this.props.children}
      </MessagesContext.Provider>
    )
  }
}
