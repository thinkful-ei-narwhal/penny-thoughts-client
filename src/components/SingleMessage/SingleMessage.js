import React, { useContext, useState, Fragment } from 'react'
import messageService from '../../services/messageService'
import MessageContext from '../../contexts/MessagesContext';
import useLongPress from '../../events/LongPress';

export default function SingleMessage(props) {

  const MessagesCon = useContext(MessageContext)

  const [report, toggleReport] = useState(false)
  const [confirm, toggleConfirm] = useState(false)

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

  const renderReport = () => {
    return (
      <div className="modal-box">
        <button className="report-button"
        onClick={() => toggleConfirm(!confirm)}>Report!</button>
      </div>
    )
  }

  const renderConfirm = () => {
    return (
      <div className="modal-box">
         <p>Are you sure you'd like to report this message?</p>
        <button onClick={() => {
          // make call to server
          updateMessage(props.id)
          toggleConfirm(!confirm)
          toggleReport(!report);
        }}>Yes</button>

        <button onClick={() => {
          toggleConfirm(!confirm)
          toggleReport(!report);
        }}>No</button>
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
        {...longPressEvent}
        className="coin">{props.message}
      </div>
      {report && renderReport()}
      {confirm && renderConfirm()}
    </Fragment>
  )

}