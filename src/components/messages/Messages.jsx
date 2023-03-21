import { doc, onSnapshot } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { ChatContext } from '../../context/chatContext'
import Message from '../message/Message'
import { db } from "../../firebase.js"
import "./index.css"
import { AuthContext } from '../../context/authContext'

const Messages = () => {
  const [messages, setMessages] = useState([])
  
  const { data } = useContext(ChatContext)
  const {currentUser} = useContext(AuthContext)

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(Object.entries(doc.data().messages))
    })

    return () =>{
      unsub()
    }
  }, [data.chatId])
  
  return (
    <div className='messages'>
      {messages.map(message => {
        return(
        <Message
          key={message[1].id}
          message={message[1].text}
          img={message[1].senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL}
          isContactMessage={message[1].senderId !== currentUser.uid}  
        />
      )})}
    </div>
  )
}

export default Messages