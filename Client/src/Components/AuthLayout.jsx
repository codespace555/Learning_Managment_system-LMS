import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function AuthLayout({authentication = true, children}) {
    const navigate = useNavigate()

    const authStatus = useSelector(state => state.auth.status)
    useEffect( () => {
        if(authentication && authStatus !== authentication){
            navigate("/account/login")

        }else if(!authentication && authStatus !== authentication){
            navigate("/")
        }
       
    },[authStatus,navigate,authentication])
  return <>{children}</> 
}

export default AuthLayout
