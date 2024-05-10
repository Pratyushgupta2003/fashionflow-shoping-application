import React from 'react'
import Footer from './Footer'
import {Helmet} from "react-helmet";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbars from './Navbars';
export default function Layout({children , title }) {
  return (
    <>
    <Helmet>
        <meta charSet="utf-8" />
        
        <title>{title}</title>
      </Helmet>
    <Navbars />
    {/* <Header></Header> */}
    <main style={{ minHeight: "70vh" }}>
    <ToastContainer />
      {children}    
    </main>
    <Footer></Footer>
    
    </>
  )
}
