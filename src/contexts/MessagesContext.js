import React, {Component } from 'react';

const MessagesContext = React.createContext({
  messages: [],
  error: null,
  setError: () => {},
  clearError: () => {},
  setMessages: () => {},
  changeMessage: () => {}
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

  changeMessage = (data, id) => {
    console.log(id);
    let ind = this.state.messages.findIndex(el => el.id === id)
    console.log(ind);
    let newArr = this.state.messages;
    newArr[ind] = data;
    console.log(newArr);
    this.setState({
      messages: newArr
    })
    console.log(this.state.messages);
  }

  render() {
    const value = {
      messages: this.state.messages,
      error: this.state.error,
      clearError: this.clearError,
      setError: this.setError,
      setMessages: this.setMessages,
      changeMessage: this.changeMessage,
    }

    return (
      <MessagesContext.Provider value={value}>
        {this.props.children}
      </MessagesContext.Provider>
    )
  }
}
