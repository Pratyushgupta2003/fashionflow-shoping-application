
import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/auth'
import axios from 'axios'
import { Outlet } from 'react-router-dom';
import Homepage from '../pages/Homepage';
export default function Private() {
  const [ok , setOk]=useState(false);
  const [auth , setAuth]=useAuth();
  useEffect(()=>{
    const authCheck = async()=>{
      const res = await axios.get('/api/v1/auth/user-auth')
    console.log(res,auth?.token)

    if(res.data.ok){
    setOk(true)}
    else{
      setOk(false)}
  }
  if(auth?.token)
  {authCheck();
    console.log(ok)
  }
},[auth?.token])
  return (
    <>
    
    {(ok)?<Outlet/>:'spinner'}
    </>
  )
}
