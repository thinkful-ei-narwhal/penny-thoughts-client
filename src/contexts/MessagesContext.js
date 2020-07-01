import React, {Component } from 'react';

const MessagesContext = React.createContext({
  messages: [],
  error: null,
  setError: () => {},
  clearError: () => {},
  setMessages: () => {}
});

export default MessagesContext;

export class MessageProvider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: [],
      error: null,
    }
  }

  setError = error => {
    this.setState({
      error: error
    })
  }
  
  clearError = () => {
    this.setState({
      error: null
    })
  }

  setMessages = data => {
    this.setState({
      messages: data
    })
  }

  render() {
    const value = {
      messages: this.state.messages,
      error: this.state.error,
      clearError: this.clearError,
      setError: this.setError,
      setMessages: this.setMessages
    }

    return (
      <MessagesContext.Provider value={value}>
        {this.props.children}
      </MessagesContext.Provider>
    )
  }
}
