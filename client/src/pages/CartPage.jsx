import React, { useEffect, useState } from 'react'
import Layout from '../components/layout/Layout'
import { useCart } from '../context/Cart'
import { useAuth } from '../context/auth'
import { useNavigate } from 'react-router-dom'
import DropIn from "braintree-web-drop-in-react";
import axios from 'axios'
import { toast } from 'react-toastify'
import { CiCircleMinus } from "react-icons/ci";
import { FaPlusSquare } from "react-icons/fa";
import { CiSquarePlus } from "react-icons/ci";
import { CiSquareMinus } from "react-icons/ci";

export default function CartPage() {
  const [cart , setCart] = useCart();
  const [auth , setAuth] = useAuth();
  const navigate = useNavigate();
  const [clientToken , setClientToken] = useState("")
  const [instance , setInstance] = useState("")

  useEffect(()=>{ setCart(JSON.parse(localStorage.getItem('Cart')))} , [])

  const removeCart = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("Cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  const toatalPrice = ()=>{
    try {
      let total = 0 ;
      {cart?.map(item =>{
        total = total + (item.price * item.quantity );
      })}

      return total.toLocaleString("en-US" , {
        style:"currency",
        currency:"INR",
      })
    } catch (error) {
      console.log(error)
    }
  }
  //get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/v1/product/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);

  //handle payments
  const handlePayment = async () => {
    try {
      // setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("http://localhost:8080/api/v1/product/braintree/payment", {
        nonce,
        cart,
      });
      // setLoading(false);
      localStorage.removeItem("Cart");
      setCart([]);
      navigate("/user/order");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      // setLoading(false);
    }
  };
  const increaseQuantity = (pid) => {
    const updatedCart = cart.map(item => {
      if (item._id === pid) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCart(updatedCart);
    localStorage.setItem("Cart", JSON.stringify(updatedCart));
  };
  const decreaseQuantity = (pid) => {
    const updatedCart = cart.map(item => {
      if (item._id === pid && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCart(updatedCart);
    localStorage.setItem("Cart", JSON.stringify(updatedCart));
  };
  return (
    <Layout title={"Cart"}>
      <div className='background'>
        <div className='row'>
          <div className='col-md-12'>
            
            <h6 className='text-center HUH'> {cart?.length>=1 ? `Hello ${auth?.token && auth?.user?.name} You have ${cart?.length} item in you cart  ${auth?.token ?"":"please login to check out items"}` : "your cart is empty"}</h6>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-8 d-flex flex-column mt-4 align-items-center m-auto'>
            {
              cart?.map(p=>(
                <div key={p.id} className=" row d-flex flex-row  align-items-top justify-content-around cartCard shadow ">
                  <div className="col-md-4 d-flex justify-content-center align-items-center">
                    <img  src={`http://localhost:8080/api/v1/product/get-photo/${p._id}`} alt={p.name} className='rounded-4'  height={"250px"} width={"250px"} /></div>
                  <div className="col-md-6 cartHeading ">
                    <p><b>Name:</b> {p.name}</p>
                    <p><strong>Description:</strong> {p.description}</p>
                    <p><strong>Quantity: </strong><span onClick={() => decreaseQuantity(p._id)}><CiSquareMinus />

</span> {p.quantity}<span onClick={() => increaseQuantity(p._id)}><CiSquarePlus />
</span></p>
                    <p><strong>Price:</strong> Rs.{p.price * p.quantity}</p>
                    <button className='btn btn-danger cartButton' onClick={()=>removeCart(p._id)}>Remove</button>
                    


                  </div>
                  
                </div>
              ))
            }
          </div>
          <div className='col-md-3 m-1 mt-3 border shadow rounded-5 m-auto p-5 w-75 '>
            <h2>Cart Summary</h2>
            <p>Total | Checkout | Payment </p>
            <hr />
            <h4>Total : {toatalPrice()}</h4>
            {auth?.token ? <div><p>current Address : {auth?.user.address}</p><button className='btn btn-outline-danger' onClick={()=>{navigate('/user/profile' ,{state:"/cart"})}}>Change address</button></div>:<button className='btn btn-warning' onClick={()=>navigate('/login' , {state :'/cart'})}>Please login to checkout</button>}
            <div className="mt-2">
                {!clientToken || !auth?.token || !cart?.length ? (
                  ""
                ) : (
                  <>
                    <DropIn
                      options={{
                        authorization: clientToken,
                        paypal: {
                          flow: "vault",
                        },
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />

                    <button
                      className="btn btn-primary"
                      onClick={handlePayment}
                      disabled={  !instance || !auth?.user?.address}
                    >
                      Make Payement
                    </button>
                  </>
                )}
              </div>
        </div>
          
            
        </div>
      </div>
    </Layout>
  )
}
