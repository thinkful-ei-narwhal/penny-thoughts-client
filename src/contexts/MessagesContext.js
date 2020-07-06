import React, {Component } from 'react';

const MessagesContext = React.createContext({
  messages: [],
  submittedMessage: '',
  error: null,
  success: null,
  setError: () => {},
  clearError: () => {},
  setMessages: () => {},
  changeMessage: () => {}
  setSuccess: () => {},
  clearSuccess: () => {}

});

export default MessagesContext;

export class MessageProvider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: [],
      submittedMessage: '',
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
  
  setSubmittedMessage = message => {
    this.setState({
      submittedMessage: message
    }, () => {
      return this.state.submittedMessage
    })
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

  render() {
    const value = {
      messages: this.state.messages,
      submittedMessage: this.state.submittedMessage,
      error: this.state.error,
      success: this.state.success,
      clearError: this.clearError,
      setError: this.setError,
      setMessages: this.setMessages,
      changeMessage: this.changeMessage,
      setSubmittedMessage: this.setSubmittedMessage,
      setSuccess: this.setSuccess,
      clearSuccess: this.clearSuccess,
    }

    return (
      <MessagesContext.Provider value={value}>
        {this.props.children}
      </MessagesContext.Provider>
    )
  }
}
