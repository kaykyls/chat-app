import React, { useEffect, useRef } from 'react'
import "./index.css"

const Message = (props) => {
  const ref = useRef()

  useEffect(() => {
    ref.current?.scrollIntoView()
  }, [props.message])

  return (
    <div ref={ref} className={`message${props.messageImg !== undefined ? " image-msg" : ""}`}>
      <div className={props.isContactMessage ? "contact-message" : "user-message"}>
        <img className='chat-image' src={props.img} alt="" />
        <div className="text-bg">
          {props.message !== "" &&
            <span className='text'>
              {props.message}
            </span>
          }
          {props.messageImg && 
            <img src={props.messageImg}/>
          }
        </div>
      </div>
    </div>
  )
}

export default Message