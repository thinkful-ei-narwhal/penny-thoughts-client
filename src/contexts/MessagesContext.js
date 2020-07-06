import React, {Component } from 'react';

const MessagesContext = React.createContext({
  messages: [],
  userMessages: [],
  error: null,
  setError: () => {},
  clearError: () => {},
  setMessages: () => {},
  setUserMessages: () => {}
});

export default MessagesContext;

export class MessageProvider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: [],
      userMessages: [],
      error: null,
      success: null
    }
  }

  setError = error => {
    this.setState({
      success: null,
      error: error
    })
  }
  
  clearError = () => {
    this.setState({
      success: null,
      error: null
    })
  }

  setMessages = data => {
    this.setState({
      messages: data
    })
  }

  setUserMessages = data => {
    this.setState({
      userMessages: data
    })
  }

  render() {
    const value = {
      messages: this.state.messages,
      userMessages: this.state.userMessages,
      error: this.state.error,
      clearError: this.clearError,
      setError: this.setError,
      setMessages: this.setMessages,
      setUserMessages: this.setUserMessages
    }

    return (
      <MessagesContext.Provider value={value}>
        {this.props.children}
      </MessagesContext.Provider>
    )
  }
}
