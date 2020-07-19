import React, { useContext, useState, Fragment } from 'react'
import messageService from '../../services/messageService'
import MessageContext from '../../contexts/MessagesContext';
import useLongPress from '../../events/LongPress';
import './SingleMessage.css'

export default function SingleMessage(props) {

  /* This function component had to be created in order to use the 
  LongPres.js event handler that we created.  Therefore, some things
  are very different from the rest of the code. */

  // We bring in context using the UseContext hook.
  const MessagesCon = useContext(MessageContext)


  // We apply a state and SetState in the useState hook similar to classes.

  const [state, setState] = useState({report: false, confirm: false, success: false})
  

  /* Here we use an async/await function in order to make a second call if the 
  message is already in the list of coins displayed.  It makes more sense than
  sending data for a get (unRESTful) or a post (also unRESTful) and as the messages
  increase, the chance of this happening approaches 0 */

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
    setState(oldVals => ({...oldVals, report: !state.report})) // The first example of updating state with hooks
  };

  const onClickCoin = () => {
    flipCoin() // this starts the coin flip animation
    updateMessage(props.id)
  }

  // This is put here in order to allow the accessibility of key presses

  const handleKeyPress = (event) => {
    if(event.key === 'Enter') {
      onClickCoin()
    }

    if(event.key === ' ') {
      onLongPress()
    }
  }

  // This renders the report modal

  const renderReport = () => {
    return (
      <div className="modal-box">
        <p>You're about to report the message '{props.message}' for inappropriate 
        or unfriendly content. Sometimes, Penny can't quite pick
        up on modern Internet lingo and some things slip through it's
        filter.</p>
        <p>Do you wish you continue?</p>
        <button className="report-button"
        onClick={() => {
          setState(oldVals => ({...oldVals, report: !state.report, confirm: !state.confirm}))
        }}>Yes, Report!</button>
        <button className="cancel-button"
        onClick={() => setState(oldVals => ({...oldVals, report: !state.report}))}>Cancel</button>
      </div>
    )
  }

  // this renders the confirmation of a report

  const renderConfirm = () => {
    return (
      <div className="modal-box">
         <p>Are you sure you'd like to report this message?</p>
        <button 
        className="yes-no-ok"
        onClick={() => {
          messageService.flagMessage(props.id)
            .then(() => {
            updateMessage(props.id)
            setState(oldVals => ({...oldVals, report: false, confirm: false, success: true}))
          })
        }}>Yes</button>

        <button
         className="yes-no-ok"
         onClick={() => {
          setState(oldVals => ({...oldVals, report: false, confirm: false}))
        }}>No</button>
      </div>
    )
  }

  // this renders that the report was successful

  const renderSuccess = () => {
    return (
      <div className="modal-box">
         <p>Your Message Was Successfully Reported!</p>
  
        <button
        className="yes-no-ok"
         onClick={() => {
          setState(oldVals => ({...oldVals, report: false, confirm: false, success: false}))
        }}>OK</button>
      </div>
    )
  }

  // this sets default options for the longPress event handler

  const defaultOptions = {
    shouldPreventDefault: true,
    delay: 500,
  };

  const longPressEvent = useLongPress(onLongPress, onClickCoin, defaultOptions);

  /* --- Coin Stuff --- */

  /* Here we need to make references to the coins and text in order to change their style 
  for animations */
  

  const coinRef = React.useRef();
  const textRef = React.useRef();
  const dilutedFrames = [2, 3, 8, 10, 11, 13, 19]; // this changes the animation when slowing down
  const finalFrames = [16, 6]; // when even more slowed down

  React.useEffect(() => {
    flipCoin();
    // eslint-disable-next-line
  }, []);

const nextFrame = (target, frame, speed) => {
  if (speed < 20 + target && dilutedFrames.includes(frame)) {
    nextFrame(target, frame + 1, speed);
  } else if (speed > 60 + target && finalFrames.includes(frame)) {
    if (coinRef.current){ // will crash if not checking for the current
      coinRef.current.style.backgroundImage = `url(images/coin${frame}.png)`;
      coinRef.current.classList.remove("spinning");
      coinRef.current.classList.add("finished");
    }
    if (textRef.current){ // will crash if not checking for the text
      
      textRef.current.classList.remove("spinning");
      textRef.current.classList.add("finished");
    }
    
  } else {

    if (coinRef.current) {
      coinRef.current.style.backgroundImage = `url(images/coin${frame}.png)`;
    setTimeout(
      () => nextFrame(target, frame < 20 ? frame + 1 : 1, ++speed),
      speed
    );
    }
    
  }
};

// flipping the coin starts the animation sequence

const flipCoin = () => {
  const target = Math.floor(Math.random() * 50);
  textRef.current.classList.remove("finished");
  textRef.current.classList.add("spinning");
  coinRef.current.classList.add("spinning");
  nextFrame(target, 0, 0);
};

  return (
      <Fragment>
        <div
          ref={coinRef}
          id="coin"
          role="button"
          tabIndex='0'
          {...longPressEvent}
          onKeyDown={(e) => handleKeyPress(e)}
          className="coin">
          <p 
          ref={textRef}
          className="coin-text">{props.message}
          </p>
        </div>
        {state.report && renderReport()}
        {state.confirm && renderConfirm()}
        {state.success && renderSuccess()}
      </Fragment>
  )

}