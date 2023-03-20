import React, { useContext } from 'react'
import { ChatContext } from '../../context/chatContext'
import "./index.css"
import Info from '../info/Info'
import Messages from '../messages/Messages'
import Input from '../input/Input'

const Chat = (props) => {
  const { data } = useContext(ChatContext)

  return (
    <div className='chat-bg'>
      <Info name={data.user?.displayName} img={data.user?.photoURL}/>
      <Messages/>
      <Input/>
    </div>
  )
}

export default Chat