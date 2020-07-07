import React, { Component } from 'react';
import messageService from '../services/messageService'
const MessagesContext = React.createContext({
  messages: [],
  userMessages: [],
  error: null,
  setError: () => { },
  clearError: () => { },
  setMessages: () => { },
  setUserMessages: () => { },
  updateUserMessage: () => { },
  isLoading: false,
  toggleLoading: () => { }
});

export default MessagesContext;

export class MessageProvider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: [],
      userMessages: [],
      error: null,
      success: null,
      isLoading: true
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
  toggleLoading = () => {
    if (this.state.isLoading === true) {
      this.setState({ isLoading: false })
    }
    if (this.state.isLoading === false) {
      this.setState({ isLoading: true })
    }
  }
  updateUserMessage = (id, value) => {
    //then call the update method on the server
    //then put the below code into the .then() of the check
    this.toggleLoading()
    messageService.editUserMessage(id, value)
      .then((res) => {
        if (res === 204) {
          const userMessages = [...this.state.userMessages]
          userMessages.find(mes => mes.id === id).message = value;
          userMessages.find(mes => mes.id === id).flagged = false;
          //update the new state
          this.setState({ userMessages: userMessages, isLoading: false, error: null })
        }
        //if endpoint accepted: do above, else:
        const userMessages = [...this.state.userMessages]
        userMessages.find(mes => mes.id === id).flagged = true;
        //update the new state
        this.setState({ error: res })
        this.setState({
          userMessages: userMessages,
          isLoading: false,
        })
      })
      .catch(err => console.log(err))

  }

  render() {
    const value = {
      messages: this.state.messages,
      userMessages: this.state.userMessages,
      error: this.state.error,
      clearError: this.clearError,
      setError: this.setError,
      setMessages: this.setMessages,
      setUserMessages: this.setUserMessages,
      updateUserMessage: this.updateUserMessage,
      isLoading: this.state.isLoading,
      toggleLoading: this.toggleLoading
    }

    return (
      <MessagesContext.Provider value={value}>
        {this.props.children}
      </MessagesContext.Provider>
    )
  }
}
