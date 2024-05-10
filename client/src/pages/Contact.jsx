import React from 'react'
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";
import Layout from '../components/layout/Layout';
import img from "../assets/contact.jpg"
export default function Contact() {
  return (
    <Layout title={"Contact us"}>
      <div className="row contactus ">
        <div className="col-md-6 p-3 d-flex justify-content-center align-items-center">
          <img
            src={img}
            alt="contactus"
            id='aboutimg'
            // style={{ width: "100%" }}
            className='sd'
          />
        </div>
        <div className="col-md-4 rounded-3 shadow">
          <h1 className="bg-dark p-2 text-white text-center rounded-3">CONTACT US</h1>
          <div className=" p-3">
          <p className="text-justify mt-2">
            any query and info about prodduct feel free to call anytime we 24X7
            vaialible
          </p>
          <p className="mt-3">
            <BiMailSend /> : www.help@ecommerceapp.com
          </p>
          <p className="mt-3">
            <BiPhoneCall /> : 012-3456789
          </p>
          <p className="mt-3">
            <BiSupport /> : 1800-0000-0000 (toll free)
          </p>
          </div>
        </div>
      </div>
    </Layout>
  )
}
