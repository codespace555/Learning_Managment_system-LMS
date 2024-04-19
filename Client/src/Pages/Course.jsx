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
    <div>
      <button onClick={handel}>getUser</button>
    </div>
  )
}

export default Course
