import React from 'react'
import "./index.css"
import Info from '../info/Info'
import Messages from '../messages/Messages'
import Input from '../input/Input'

const Chat = (props) => {
  return (
    <div className='chat-bg'>
      <Info/>
      <Messages/>
      <Input/>
    </div>
  )
}

export default Chat