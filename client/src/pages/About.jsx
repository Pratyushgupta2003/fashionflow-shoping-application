
 import React from 'react'
import Layout from '../components/layout/Layout'
import img from "../assets/about.jpg"
 export default function About() {
   return (
        
        <Layout title={"About us - Ecommer app"}>
          <div className='d-flex justify-content-center align-items-center'>
          <div className="row container d-flex justify-content-center align-items-center ">
        <div className="col-md-6 d-flex justify-content-center align-items-center" >
          <img
            src={img}
            id='aboutimg'
            alt="contactus"
            className='sd'

          />
        </div>
        <div className="col-md-6 shadow d-flex justify-content-center flex-column rounded-3 mt-2">
        <h4 className="HUH text-center">FasionFlow</h4>
          <p className="text-justify  p-3">"Welcome to ClothEase, your ultimate destination for effortless and stylish online shopping! At ClothEase, we believe that finding the perfect outfit should be as easy as it is enjoyable.
          </p>
          <p>

Whether you're searching for casual everyday wear, elegant evening attire, or anything in between, ClothEase has you covered. Our user-friendly interface and intuitive search features make it simple to navigate through our extensive catalog and discover pieces that suit your personal taste and preferences.</p>
<p>
With secure payment options and fast shipping, shopping at ClothEase is not only convenient but also enjoyable. Join our community of fashion enthusiasts today and elevate your wardrobe with the latest looks from ClothEase!"
</p>
          
        </div>
      </div>
          </div>
      
    </Layout>

     
   )
 }
 
 