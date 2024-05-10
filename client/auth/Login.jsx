import React, { useRef } from 'react'
import Layout from '../src/components/layout/Layout'
import "./login.css"
import { Link } from 'react-router-dom'
import {  toast } from 'react-toastify';
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../src/context/auth';
import { TiDelete } from "react-icons/ti";
import { usePop } from '../src/context/popup';
export default function Login({setLoginDisplay , setSignupDisplay}) {
  const [auth , setAuth] = useAuth();
  const email = useRef(null)
  const password = useRef(null)
  const navigate = useNavigate();

  const handleOnSubmit = async(e) => {
    e.preventDefault(); 
    const email1= email.current.value
    const password1= password.current.value
    try {
      const res = await axios.post("http://localhost:8080/api/v1/auth/login",{email:email1,password:password1})
      if( res.data.success)
      {
        
        setAuth({
          ...auth,
          user : res.data.user,
          token:res.data.token
        }
        
        )
        console.log(res.data)
        console.log(auth)
        
        localStorage.setItem("auth",JSON.stringify(res.data))
        
        
        toast.success(res.data.message)
        navigate("/")
      }
      else
      toast.error(res.data.message)
    } catch (error) {
      console.log(error);
      toast.error("something went wrong")
    }
  }

  // const [setSignup , signup] = usePop()
  const setSignupDisplayFun = ()=>{
    navigate("/register")
  }
  return (
    <Layout>
        <div className='login-popup'>

      <form className="form " onSubmit={handleOnSubmit}>
        <div onClick={()=>{navigate("/")}}><TiDelete /></div>
      

       <p className="form-title">Sign in to your account</p>
        <div className="input-container">
          <input placeholder="Enter email" type="email" ref={email}/>
          <span>
            <svg stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"></path>
            </svg>
          </span>
      </div>
      <div className="input-container">
          <input placeholder="Enter password" type="password" ref={password}/>

          <span>
            <svg stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"></path>
              <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"></path>
            </svg>
          </span>
        </div>
         <button className="submit" type="submit">
        Sign in
      </button>

      <p className="signup-link">
      <Link to="/forgot">Forgot password</Link>
      </p>
   </form>
   
   

       <p className="form form-title signup-link my-2">Dont have an account ?<button onClick={setSignupDisplayFun}>Sign up</button></p>

{/*


      <form>
  <div className="mb-3">
    <label htmlfor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlfor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1"/>
  </div>
  
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
  */}
    </div>
    </Layout>
  )
}
