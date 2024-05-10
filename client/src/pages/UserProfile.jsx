import Layout from '../components/layout/Layout'
import React, { useEffect, useRef, useState } from 'react'

import {  toast } from 'react-toastify';
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/auth';
export default function UserProfile() {
  const [auth, setAuth] = useAuth();
  //state
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    
    console.log(auth)
    const {  email,name, phone, address } = auth?.user;
    setUsername(name);
    setPhone(phone);
    setEmail(email);
    setAddress(address);
  }, [auth?.user]);

   const navigate = useNavigate()

  const handleOnSubmit = async(e) => {
    e.preventDefault(); 
    try {
      const { data } = await axios.put("http://localhost:8080/api/v1/auth/profile", {
        username,
        email,
        password,
        phone,
        address,
      });
      if (data?.errro) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  
  }
  
 
  return (
    <Layout title={"Your Profile"}>
      <form className="form container family" onSubmit={handleOnSubmit}>
    <p className="title">User Profile </p>
        
        <label>
        <div>Firstname</div>
            <input  type="text" className="input" value={username}
                    onChange={(e) => setUsername(e.target.value)}/>
            
        </label>
 
            
    <label>
    <div>Email</div>
        <input required="true" placeholder="" type="email" className="input" value={email}
                    onChange={(e) => setEmail(e.target.value)} />
        
    </label> 
        
    <label>
    <div>Password</div>
        <input  placeholder="" type="password" className="input"  value={password}
                    onChange={(e) => setPassword(e.target.value)}/>
        
    </label>
    
    <label>
    <div>Address</div>
        <input required="true" placeholder="" type="string" className="input"  value={address}
                    onChange={(e) => setAddress(e.target.value)}/>
        
    </label>
    
    <label>
    <div>Phone Number</div>
        <input required="true" placeholder="" type="number" className="input" value={phone}
                    onChange={(e) => setPhone(e.target.value)}/>
        
    </label>
    <div>
   
    <button type="submit" className='btn btn-primary'>Update</button>
    </div>
</form>

    </Layout>
  )
}
