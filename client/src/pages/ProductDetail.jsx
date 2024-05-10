import React, { useEffect, useState } from 'react'
import Layout from '../components/layout/Layout'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useCart } from '../context/Cart';

export default function ProductDetail() {
  const [product , setProduct] = useState({});
  const params = useParams();
  const [relatedProduct , setRelatedProduct] = useState([]);
  const navigate = useNavigate();
  const [cart , setCart] = useCart()

  useEffect(()=>{
    if(params?.slug)getProduct();
    // console.log(product)
  },[params?.slug])

  const getProduct = async()=>{
    try {
      const {data } =await axios.get(`http://localhost:8080/api/v1/product/get-product/${params.slug}`)
      setProduct(data.product);
      // console.log(data.product,"product")
      getSimilarProduct(data?.product._id , data?.product.category._id)
    } catch (error) {
      console.log(error)
    }
  }

  const getSimilarProduct = async(pid , cid )=>{
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/related-product/${pid}/${cid}`
      );
      // console.log(data , "similar product")
      setRelatedProduct(data?.products);
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Layout>
      <div className="container">
      <div className="row product-details p-3 ">
        <div className="col-md-6">
          <img
            src={`http://localhost:8080/api/v1/product/get-photo/${product._id}`}
            className="card-img-top img"
            alt={product.name}
            height="300"
            width={"350px"}
          />
        </div>
        <div className="col-md-6 product-details-info ">
          <h1 className="text-center HUH">Product Details</h1>
          <hr />
          <h6><strong>Name</strong> : {product.name}</h6>
          <h6><strong>Description</strong> : {product.description}</h6>
          <h6><strong>Quantity</strong> : {product.quantity}</h6>
          <h6>
          <strong>Price</strong> :
            {product?.price?.toLocaleString("en-US", {
              style: "currency",
              currency: "INR",
            })}
          </h6>
          <h6><strong>Category</strong> : {product?.category?.name}</h6>
          <button type="button" className="btn btn-warning ms-3" onClick={()=>{setCart([...cart , product]);
                        localStorage.setItem('Cart' , JSON.stringify(cart));
                        toast.success("item added to cart");}}>
                          Add to cart
                        </button>
        </div>
      </div>
      <hr />
      <div className=" row  similar-products">
        <h4>Similar Products ➡️</h4>
        {relatedProduct.length < 1 && (
          <p className="text-center">No Similar Products found</p>
        )}
        <div className="d-flex flex-row flex-wrap justify-content-center">
          {relatedProduct?.map((p) => (
            <div className="card m-2 " key={p._id}>
              <img
                src={`http://localhost:8080/api/v1/product/get-photo/${p._id}`}
                className="card-img-top"
                alt={p.name}
                height={"200px"}
                width={"200px"}
              />
              <div className="card-body">
                <div className="card-name-price">
                  <h5 className="card-title">{p.name}</h5>
                  <h5 className="card-title card-price">
                    {p.price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </h5>
                </div>
                {/* <p className="card-text ">
                  {p.description.substring(0, 60)}...
                </p> */}
                <div className="card-name-price">
                  <button
                    className="btn btn-primary ms-1"
                    onClick={() => navigate(`/get-product/${p.slug}`)}
                  >
                    More Details
                  </button>
                  {/* <button
                  className="btn btn-dark ms-1"
                  onClick={() => {
                    setCart([...cart, p]);
                    localStorage.setItem(
                      "cart",
                      JSON.stringify([...cart, p])
                    );
                    toast.success("Item Added to cart");
                  }}
                >
                  ADD TO CART
                </button> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </Layout>
  )
}
