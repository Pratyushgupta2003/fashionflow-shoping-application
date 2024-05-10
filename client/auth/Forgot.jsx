import React, { useRef } from 'react'
import Layout from '../src/components/layout/Layout'
import "./login.css"
import { Link } from 'react-router-dom'
import {  toast } from 'react-toastify';
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../src/context/auth';
export default function Forgot() {

  const [auth , setAuth] = useAuth();
  const email = useRef(null)
  const password = useRef(null)
  const ans = useRef(null)

  const handleOnReset = async(e) => {
    e.preventDefault(); 
    const email1= email.current.value
    const password1= password.current.value
    const ans1= ans.current.value
    
    try {
      const res = await axios.post("http://localhost:8080/api/v1/auth/forgotpassword",{email:email1,newPassword:password1,ans:ans1})
      console.log(res)
      if( res.data.success)
      {
        console.log(res.data.success)
        toast.success(res.data.message)
        // navigate("/login")

      }
      else
      toast.error(res.data.message)
    } catch (error) {
      console.log(error);
      toast.error("something went wrong")
    }
  }
  return (
    <div>
    <Layout>

    <form className="form container mt-3n mt-3" onSubmit={handleOnReset}>
     <p className="form-title">Reset your password</p>
      <div className="input-container">
        <input placeholder="Enter email" type="email" ref={email}/>
        <span>
          <svg stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"></path>
          </svg>
        </span>
    </div>
    <div className="input-container">
        <input placeholder="Enter new password" type="password" ref={password}/>

        <span>
          <svg stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"></path>
            <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"></path>
          </svg>
        </span>
      </div>
      <div className="input-container">
        <input placeholder="Enter your fav name?" type="string" ref={ans}/>

        <span>
          <svg stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"></path>
            <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"></path>
          </svg>
        </span> 
      </div>
       <button className="submit" type="submit">
      Update
    </button>
 </form>
    </Layout>
  </div>
  )
}
