import React, { Component } from 'react';
import messageService from '../services/messageService'
const MessagesContext = React.createContext({
  messages: [],
  flaggedMessages: [],
  userMessages: [],
  error: null,
  success: null,
  userData: [],
  setUserData: () => { },
  setError: () => { },
  clearError: () => { },
  setMessages: () => { },
  setFlaggedMessages: () => { },
  setUserMessages: () => { },
  updateUserMessage: () => { },
  isLoading: false,
  isLoadingThink: false,
  toggleLoading: () => { },
  changeMessage: () => { },
  setSuccess: () => { },
  clearSuccess: () => { },
  deleteUserMessage: () => { },
  unflagMessage: () => { },
  archiveMessage: () => { },
  setFilterMessages: () => { }
});

export default MessagesContext;

export class MessageProvider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: [],
      flaggedMessages: [],
      userMessages: [],
      error: null,
      success: null,
      isLoading: false,
      isLoadingThink: false,
    }
  }

  setError = error => { // sets errors
    this.setState({
      success: null,
      error: error
    })
  }

  clearError = () => { // clears errors
    this.setState({
      success: null,
      error: null
    })
  }

  setMessages = data => { // sets messages into state
    this.setState({
      messages: data
    })
  }

  setFlaggedMessages = data => { // sets admin messages into state
    this.setState({
      flaggedMessages: [...data]
    })
  }

  changeMessage = (data, id) => { // changes a message in state
    let ind = this.state.messages.findIndex(el => el.id === id)
    let newArr = this.state.messages;
    newArr[ind] = data;
    this.setState({
      messages: newArr
    })
  }

  setSubmittedMessage = message => { // sets the submitted message into state
    this.setState({
      submittedMessage: message
    }, () => {
      return this.state.submittedMessage
    })
  }

  setUserMessages = data => { // sets the user messaes into state
    this.setState({
      userMessages: [...data]
    })
  }

  unflagMessage = id => { // unflags a message in state
    this.setState({
      flaggedMessages: this.state.flaggedMessages.filter(message => message.id !== id)
    })
  }
  setFilterMessages = id =>{ // honestly not entirely sure what this does....
    this.setState({
      userMessages: this.state.userMessages.filter(message => message.id !== id)
    })
  }

  archiveMessage = id => { // this archives a message in the admin dashboard in state
    this.setState({
      flaggedMessages: this.state.flaggedMessages.filter(message => message.id !== id)
    })
  }

  toggleLoading = () => { // a value for if things are loading
    this.setState({ isLoading: !this.state.isLoading })
  }

  toggleLoadingThink = () => { // a value for if the thinking loader is active
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

  clearSuccess = () => { // clears the success message from state
    this.setState({
      sucess: null
    })
  }

  setSuccess = () => { // sets the success message in state
    this.setState({
      error: null,
      success: 'Your message was successfully saved!'
    }, () => {
      return this.state.success
    })
  }

  deleteUserMessage = (messageID) => { // deletes a user message
    const userMessages = [...this.state.userMessages]
    const ind = userMessages.findIndex(msg => msg.id === messageID);
    userMessages.splice(ind, 1);

    messageService.deleteUserMessage(messageID)
      .then((res) => {
        if (res === 204) {
          this.setState({ userMessages: userMessages, isLoading: false })
        }
      })
      .catch(err => this.setError(err))
  }


  render() {
    const value = {
      messages: this.state.messages,
      flaggedMessages: this.state.flaggedMessages,
      userMessages: this.state.userMessages,
      error: this.state.error,
      success: this.state.success,
      clearError: this.clearError,
      setError: this.setError,
      setMessages: this.setMessages,
      setFlaggedMessages: this.setFlaggedMessages,
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
      unflagMessage: this.unflagMessage,
      archiveMessage: this.archiveMessage,
      userData: this.state.userData,
      setUserData: this.setUserData,
      setFilterMessages: this.setFilterMessages,
    }

    return (
      <MessagesContext.Provider value={value}>
        {this.props.children}
      </MessagesContext.Provider>
    )
  }
}
