import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Chat from '../../components/chat/Chat'
import Sidebar from '../../components/sidebar/Sidebar'
import { AuthContext } from '../../context/authContext'
import "./index.css"

const Home = () => {
  // const navigate = useNavigate()

  // const {currentUser} = useContext(AuthContext)

  // if(!currentUser){
  //   navigate("/login")
  //   return
  // }
  
  return (
    <div className='home'>
      <div className="container">
        <Sidebar/>
        <Chat/>
      </div>
    </div>
  )
}

export default Home