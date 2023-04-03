import React, { useContext, useEffect, useState } from 'react'
import Contact from '../contact/Contact'
import { doc, onSnapshot } from "firebase/firestore";
import { AuthContext } from '../../context/authContext';
import { db } from "../../firebase";
import { ChatContext } from '../../context/chatContext'
import "./index.css"

const Chats = () => {
  const [chats, setChats] = useState([])

  const { currentUser } = useContext(AuthContext)
  const { dispatch } = useContext(ChatContext)

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        console.log(doc.data())
        if (doc.data()) {
          setChats(doc.data())
        }
      });

      return () => {
        unsub()
      }
    }

    currentUser.uid && getChats();
  }, [currentUser.uid])

  const handleSelect = (u) => {
    dispatch({type:"CHANGE_USER", payload: u})
  }

  return (
    <div className='chats'>
      {Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date).map((chat, index) => (
        <div key={index} onClick={() => handleSelect(chat[1].userInfo)}>
          <Contact key={chat[0]} img={chat[1].userInfo.photoURL} contactName={chat[1].userInfo.displayName} lastMessage={chat[1].lastMessage?.text} time={chat[1].date}/>
        </div>
      ))}
    </div>
  )
}

export default Chats