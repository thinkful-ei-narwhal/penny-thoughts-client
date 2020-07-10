import React, { useContext, useState, Fragment } from 'react'
import messageService from '../../services/messageService'
import MessageContext from '../../contexts/MessagesContext';
import useLongPress from '../../events/LongPress';
import './SingleMessage.css'

export default function SingleMessage(props) {

  const MessagesCon = useContext(MessageContext)

  const [report, toggleReport] = useState(false)
  const [confirm, toggleConfirm] = useState(false)
  const [success, toggleSuccess] = useState(false)

  const updateMessage = async (id) => { 
    const messages = MessagesCon.messages.map(m => m.id);
    try {
      let data = await messageService.getOneRandom(id)
      while (messages.includes(data[0].id)){
        data = await messageService.getOneRandom(id)
      }
      MessagesCon.changeMessage(data[0], id)
    } catch (err) {
      MessagesCon.setError(err)
    } finally {}
  };

  const onLongPress = () => {
    toggleReport(!report);
  };

  const onClickCoin = () => {
    updateMessage(props.id)
  }

  const handleKeyPress = (event) => {
    if(event.key === 'Enter') {
      onClickCoin()
    }

    if(event.key === ' ') {
      onLongPress()
    }
  }

  const renderReport = () => {
    return (
      <div className="modal-box">
        <p>You're about to report this message for inappropriate 
        or unfriendly content. Sometimes, Penny can't quite pick
        up on modern Internet lingo and some things slip through it's
        filter.</p>
        <p>Do you wish you continue?</p>
        <button className="report-button"
        onClick={() => {
          toggleReport(!report)
          toggleConfirm(!confirm)}
        }>Yes, Report!</button>
        <button className="cancel-button"
        onClick={() => toggleReport(!report)}>Cancel</button>
      </div>
    )
  }

  const renderConfirm = () => {
    return (
      <div className="modal-box">
         <p>Are you sure you'd like to report this message?</p>
        <button onClick={() => {
          messageService.flagMessage(props.id)
            .then(() => {
            updateMessage(props.id)
            toggleConfirm(false)
            toggleReport(false);
            toggleSuccess(true)
          })
        }}>Yes</button>

        <button onClick={() => {
          toggleConfirm(false)
          toggleReport(false);
        }}>No</button>
      </div>
    )
  }

  const renderSuccess = () => {
    return (
      <div className="modal-box">
         <p>Your Message Was Successfully Reported!</p>
  
        <button onClick={() => {
          toggleConfirm(false)
          toggleReport(false);
          toggleSuccess(false);
        }}>OK</button>
      </div>
    )
  }

  const defaultOptions = {
    shouldPreventDefault: true,
    delay: 500,
  };

  const longPressEvent = useLongPress(onLongPress, onClickCoin, defaultOptions);

  return (
    <Fragment>
      <div
        role="button"
        tabindex='0'
        {...longPressEvent}
        onKeyDown={(e) => handleKeyPress(e)}
        className="coin">{props.message}
      </div>
      {report && renderReport()}
      {confirm && renderConfirm()}
      {success && renderSuccess()}
    </Fragment>
  )

}