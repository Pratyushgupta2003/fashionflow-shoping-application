import React, { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import {  useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { Checkbox , Radio } from 'antd'; 
import { Price } from '../components/Price';
import { useCart } from '../context/Cart';
import { toast } from 'react-toastify';
import Login from '../../auth/Login';
import { usePop } from '../context/popup';

export default function Homepage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked , setChecked ] = useState([]);
const [radio , setRadio] = useState([]);
const [ total , setTotal] = useState(0)
const [page , setPage] = useState(1);
const [count , setCount] = useState(1);
const navigate = useNavigate()
const [cart , setCart] = useCart()

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get('http://localhost:8080/api/v1/category/get-category');
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong in getting category');
    }
  };

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8080/api/v1/product/product-list/${page}`);
      setProducts(data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Error fetching products');
    }
  };


  useEffect(() => {
    // getAllProducts();
    getAllCategory();
  }, []);

//handle filter cat is category id of check category
const handleFilter =  (value , cat)=>{
  let all = [...checked  ]
  if(value){
    all.push(cat)
  }
  else
  {
    all= all.filter(c => c!==cat)
  }
   setChecked(all);
  // console.log(checked)
}
useEffect(() => {
  if (!checked.length || !radio.length) getAllProducts();
}, [checked.length, radio.length]);

useEffect(() => {
  if (checked.length || radio.length) filterProduct();
}, [checked, radio]);

//get filterd product
const filterProduct = async () => {
  try {
    const { data } = await axios.post("http://localhost:8080/api/v1/product/product-filters", {
      checked,
      radio,
    });
    // console.log(data,"data")
    setProducts(data?.products);
  } catch (error) {
    console.log(error);
  }
};

const productTotalCount  = async (req,res)=>{

  const { data } = await axios.get("http://localhost:8080/api/v1/product/total-count");
  setTotal(data.total)
}


useEffect(()=>{
  productTotalCount()
} , [])
useEffect(()=>{
  if(page==1)return ;
  loadMore();
} , [page])

const loadMore = async()=>{
  try {
    const { data } = await axios.get(`http://localhost:8080/api/v1/product/product-list/${page}`);
    // console.log(data)
  setProducts([...products , ...data?.products])
  } catch (error) {
    console.log(error);
  }
}
const {signup , setSignup} = usePop()
  return (
    <>
      <Layout  title={"All Product Offer - Home"}>
        
  
        <div className="d-flex">
          {/* <Sidebar></Sidebar> */}
        
          <div className=' d-flex flex-column p-2 mt-3 sidebar'>
            <h6 className='H'>Filter by price</h6>
            <div className='family'>
              <Radio.Group onChange={e=>{setRadio(e.target.value)}}>
              {
              Price.map((p) => (
                <div key={p._id} className='family'>
                <Radio value={p.array} >{p.name}</Radio></div>
              ))
            }
              </Radio.Group>
            
            </div>
            <div className='d-flex flex-column family'>
              <h6 className='H'>Filter by categories</h6>
            {
              categories.map((c) => (
                <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked , c._id)}>
                  {c.name}
                </Checkbox>
              ))
            }
            </div>
            <button type="button" className="btn btn-danger" onClick={()=>{window.location.reload()}}>Reset All</button>
          </div>
            <div className='d-flex flex-column justify-content-around'>
            <div className=" d-flex flex-row flex-wrap justify-content-around background" >
            
              {products.map((p) => (
                
                <div className="m-3 card shadow" key={p._id}>
                    <Card key={p._id}  >
                      
                      <Card.Img variant="top" src={`http://localhost:8080/api/v1/product/get-photo/${p._id}`} height={"200px"} />
                      <Card.Body>
                        <Card.Title>{p.name}</Card.Title>
                        {/* <Card.Text>{p.description.substring(0,30)}</Card.Text> */}
                        <Card.Text>Rs. {p.price}</Card.Text>
                        <div className="d-flex button">
                          <button type="button" className="btn btn-primary "  onClick={()=>{navigate(`/get-product/${p.slug}`)}}>
                          More Detail
                        </button>
                        
                        <button type="button" className="btn btn-warning ms-3" onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "Cart",
                          JSON.stringify([...cart, p])
                        );
                        toast.success("Item Added to cart" , {className: "toast-message"});
                      }}>
                          Add to cart
                        </button></div>
                        
                      </Card.Body>
                    </Card>
                </div>
               
              ))}
            </div>
            {
              (!checked.length && !radio.length) && products && products.length < total && (<button type="button" className="btn btn-primary" onClick={(e)=>{e.preventDefault() ;setPage(page + 1)}}>Loadmore...</button>)
            }
            </div>
          
        </div>
      </Layout>
    </>
  );
}
