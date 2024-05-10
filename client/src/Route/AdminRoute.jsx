
import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/auth'
import axios from 'axios'
import { Outlet } from 'react-router-dom';
import Homepage from '../pages/Homepage';
import Pagenotfound from '../pages/Pagenotfound';
export default function AdminRoute() {
  const [ok , setOk]=useState(false);
  const [auth , setAuth]=useAuth();
  useEffect(()=>{
    const authCheck = async()=>{
      const res = await axios.get('http://localhost:8080/api/v1/auth/admin-auth')
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
  
    return ok ? <Outlet /> : <Pagenotfound/>;
  
  
}
