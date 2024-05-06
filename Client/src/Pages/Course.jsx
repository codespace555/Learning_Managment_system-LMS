import React from 'react'
import authUser from '../Controller/User'
import { login } from '../store/authSlice'

function Course() {
  const handel = () =>{
    authUser.getUser().then((user)=>{
      console.log(login(user))
    })
  }
  
  return (
    <div className='text-black'>
      <button onClick={handel}>getUser</button>
      ferfrefre
    </div>
  )
}

export default Course
