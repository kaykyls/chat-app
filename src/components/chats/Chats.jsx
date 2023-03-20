import React, { useContext, useEffect, useState } from 'react'
import Contact from '../contact/Contact'
import teste from "./teste.jpg"
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
        setChats(doc.data());
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
      {Object.entries(chats)?.map((chat) => (
        <div onClick={() => handleSelect(chat[1].userInfo)}>
          <Contact key={chat[0]} img={chat[1].userInfo.photoURL} contactName={chat[1].userInfo.displayName} lastMessage={chat[1].lastMessage?.text} time={"00:00h"}/>
        </div>
      ))}
      <Contact img={teste} contactName={"Manoel Gomes"} lastMessage={"Olha se você não ama"} time={"00:00h"}/>
      {/* <Contact img={teste} contactName={"Manoel Gomes"} lastMessage={"Caneta azul, azul caneta"} time={"06:11h"}/>
      <Contact img={teste} contactName={"Manoel Gomes"} lastMessage={"Eu vou deixar de ser besta"} time={"13:48h"}/>
      <Contact img={teste} contactName={"Manoel Gomes"} lastMessage={"Ela é muito é vagabunda"} time={"12:34h"}/>       */}
    </div>
  )
}

export default Chats