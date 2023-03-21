import React, { Fragment, useContext } from 'react'
import { ChatContext } from '../../context/chatContext'
import "./index.css"
import Info from '../info/Info'
import Messages from '../messages/Messages'
import Input from '../input/Input'

const Chat = (props) => {
  const { data } = useContext(ChatContext)

  return (
    <div className={`chat-bg${data.chatId !== "null" ? " selected" : ""}`}>
      {data.chatId !== "null" &&
      <Fragment>
        <Info name={data.user?.displayName} img={data.user?.photoURL}/>
        <Messages/>
        <Input/>
      </Fragment>}
      {data.chatId === "null" && 
        <div className='select-message'>
          <span>Select a chat to start</span>
        </div>
      }
      
    </div>
  )
}

export default Chat