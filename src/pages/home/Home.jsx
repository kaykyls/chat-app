import React from 'react'
import Chat from '../../components/chat/Chat'
import Sidebar from '../../components/sidebar/Sidebar'
import "./index.css"

const Home = () => {
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