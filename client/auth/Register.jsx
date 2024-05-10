import React, { useRef } from 'react'
import Layout from '../src/components/layout/Layout'
import {  toast } from 'react-toastify';
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom';
import "./register.css"
import { Link } from 'react-router-dom';
import { TiDelete } from "react-icons/ti";

export default function Register({setSignupDisplay , signupDisplay}) {
  const username = useRef(null)
  const email = useRef(null)
  const phone = useRef(null)
  const password = useRef(null)
  const password2 = useRef(null)
  const address = useRef(null)
  const ans = useRef(null)
  const role = useRef(null)
   const navigate = useNavigate()
  const handleOnSubmit = async(e) => {
    e.preventDefault(); 
    const username1= username.current.value
    const email1= email.current.value
    const phone1= phone.current.value
    const password1= password.current.value
    const confirmpassword= password2.current.value
    const address1= address.current.value
    const ans1= ans.current.value
    const role1= role.current.value

    try {
      if(confirmpassword!==password1)return toast.error("Enter same confirm password")
      const res = await axios.post("http://localhost:8080/api/v1/auth/register",{name:username1,email:email1,phone:phone1,password:password1,address:address1,role:role1,ans:ans1 , })
      if( res.data.success)
      {
        toast.success(res.data.message)
        navigate("/login")

      }
      else
      toast.error(res.data.message)
    } catch (error) {
      console.log(error);
      toast.error("something went wrong")
    }
  }
  
  return (
    <Layout>
    <div className='register-popup'>
      
      
      <form className="registerform" onSubmit={handleOnSubmit}>
      <div onClick={()=>{navigate('/')}}><TiDelete /></div>
    
    <p className="title">Register </p>
    <p className="message">Signup now and get full access to our app. </p>
        <div className="flex">
        <label>
            <input required="true" placeholder="Firstname" type="text" className="input" ref={username}  />
        </label>
    </div>  
            
    <label>
        <input required="true" placeholder="Email" type="email" className="input" ref={email} />
    </label> 
        
    <label>
        <input required="true" placeholder="Password" type="password" className="input" ref={password}/>
        
    </label>
    <label>
        <input required="true" placeholder="Confirm password" type="password" className="input" ref={password2}/>
    </label>
    <label>
        <input required="true" placeholder="Address" type="string" className="input" ref={address}/>
    </label>
    <label>
        <input required="true" placeholder="Enter your fav name ?" type="string" className="input" ref={ans}/>
        
    </label>
    <label>
        <input required="true" placeholder="Phone Number" type="number" className="input" ref={phone}/>
    </label>
    <label>
      <select name="Role" id="Role" ref={role}  className="input" >
        <option value="0">User</option>
        <option value="1">Admin</option>
      </select>
        {/* <input  required="true" placeholder="Role" type="number" className="input" ref={role}/> */}
    </label>
   
    <button className="submit">Submit</button>
    {/* <p className="signin">Already have an acount ? <Link to="/login">Signin</Link> </p> */}
</form>

    </div>
    </Layout>
  )
}

