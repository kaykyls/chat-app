import React from 'react'
import Message from '../message/Message'
import "./index.css"

const Messages = () => {
  return (
    <div className='messages'>
      <Message isContactMessage={true}/>
      <Message isContactMessage={false}/>
      <Message isContactMessage={true}/>
      <Message isContactMessage={false}/><Message isContactMessage={true}/>
      <Message isContactMessage={false}/><Message isContactMessage={true}/>
      <Message isContactMessage={false}/><Message isContactMessage={true}/>
      <Message isContactMessage={false}/><Message isContactMessage={true}/>
      <Message isContactMessage={false}/><Message isContactMessage={true}/>
      <Message isContactMessage={false}/><Message isContactMessage={true}/>
      <Message isContactMessage={false}/><Message isContactMessage={true}/>
      <Message isContactMessage={false}/><Message isContactMessage={true}/>
      <Message isContactMessage={false}/><Message isContactMessage={true}/>
      <Message isContactMessage={false}/><Message isContactMessage={true}/>
      <Message isContactMessage={false}/><Message isContactMessage={true}/>
      <Message isContactMessage={false}/>
    </div>
  )
}

export default Messages