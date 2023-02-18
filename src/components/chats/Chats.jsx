import React from 'react'
import Contact from '../contact/Contact'
import teste from "./teste.jpg"
import "./index.css"

const Chats = () => {
  console.log(teste)

  return (
    <div className='chats'>
      <Contact img={teste} contactName={"Manoel Gomes"} lastMessage={"Olha se você não ama"} time={"00:00h"}/>
      <Contact img={teste} contactName={"Manoel Gomes"} lastMessage={"Caneta azul, azul caneta"} time={"06:11h"}/>
      <Contact img={teste} contactName={"Manoel Gomes"} lastMessage={"Eu vou deixar de ser besta"} time={"13:48h"}/>
      <Contact img={teste} contactName={"Manoel Gomes"} lastMessage={"Ela é muito é vagabaunda"} time={"12:34h"}/>
    </div>
  )
}

export default Chats