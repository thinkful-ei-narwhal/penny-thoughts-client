import React, { Component } from 'react';
import messageService from '../services/messageService'
const MessagesContext = React.createContext({
  messages: [],
  userMessages: [],
  error: null,
  success: null,

  setError: () => { },
  clearError: () => { },
  setMessages: () => { },
  setUserMessages: () => { },
  updateUserMessage: () => { },
  isLoading: false,
  isLoadingThink: false,
  toggleLoading: () => { },
  setMessages: () => { },
  changeMessage: () => { },
  setSuccess: () => { },
  clearSuccess: () => { },
  deleteUserMessage: () => { }
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
      isLoading: false,
      isLoadingThink: false,
    }
  }

  setError = error => {
    console.log(error);
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

  changeMessage = (data, id) => {
    let ind = this.state.messages.findIndex(el => el.id === id)
    let newArr = this.state.messages;
    newArr[ind] = data;
    this.setState({
      messages: newArr
    })
  }

  setSubmittedMessage = message => {
    this.setState({
      submittedMessage: message
    }, () => {
      return this.state.submittedMessage
    })
  }

  setUserMessages = data => {
    this.setState({
      userMessages: data
    })
  }

  toggleLoading = () => {
    this.setState({ isLoading: !this.state.isLoading })
  }

  toggleLoadingThink = () => {
    this.setState({ isLoadingThink: !this.state.isLoadingThink })
  }

  updateUserMessage = (id, value) => {
    //then call the update method on the server
    //then put the below code into the .then() of the check
    messageService.editUserMessage(id, value)

    const userMessages = [...this.state.userMessages]
    userMessages.find(mes => mes.id === id).message = value;
    userMessages.find(mes => mes.id === id).flagged = false;
    //update the new state
    this.setState({ userMessages: userMessages, isLoading: false, error: null })
  }

  clearSuccess = () => {
    this.setState({
      sucess: null
    })
  }

  setSuccess = () => {
    this.setState({
      error: null,
      success: 'Your message was successfully saved!'
    }, () => {
      return this.state.success
    })
  }

  deleteUserMessage = (messageID) => {
    let temp = [...this.state.userMessages].filter(msg => msg.id !== messageID)
    console.log(temp)
    messageService.deleteUserMessage(messageID)
      .then((res) => {
        if (res === 204) {
          console.log('i got herrrrr')
          // this.setState({ userMessages: [], isLoading: false }) // I dont know why this works like this.  Too bad!
          this.setState({ userMessages: temp, isLoading: false })
          console.log(this.state.userMessages)
        }
      })
      .catch(err => this.context.setError(err))
  }


  render() {
    const value = {
      messages: this.state.messages,
      userMessages: this.state.userMessages,
      error: this.state.error,
      success: this.state.success,
      clearError: this.clearError,
      setError: this.setError,
      setMessages: this.setMessages,
      setUserMessages: this.setUserMessages,
      updateUserMessage: this.updateUserMessage,
      isLoading: this.state.isLoading,
      isLoadingThink: this.state.isLoadingThink,
      toggleLoading: this.toggleLoading,
      toggleLoadingThink: this.toggleLoadingThink,
      changeMessage: this.changeMessage,
      setSubmittedMessage: this.setSubmittedMessage,
      setSuccess: this.setSuccess,
      clearSuccess: this.clearSuccess,
      deleteUserMessage: this.deleteUserMessage,
    }

    return (
      <MessagesContext.Provider value={value}>
        {this.props.children}
      </MessagesContext.Provider>
    )
  }
}
