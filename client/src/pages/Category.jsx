import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Layout from '../components/layout/Layout';
import { Checkbox , Radio } from 'antd';
import { Price } from '../components/Price';
import { useCart } from '../context/Cart';
import axios from "axios";
import { toast } from 'react-toastify';

export default function category() {
  const params = useParams();
  const navigate = useNavigate();
  const [products , setProducts]=useState([]);
  const [ category , setCategory] = useState([]);
  const [checked , setChecked ] = useState([]);
  const [radio , setRadio] = useState([]);
  const [cart , setCart] = useCart()
  const [categories, setCategories] = useState([]);


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
  useEffect(() => {
    // getAllProducts();
    getAllCategory();
  }, []);
  useEffect(()=>{getProductByCat()},[params.slug])

  const getProductByCat = async(req,res)=>{
    try {
      // console.log(params.slug)
      const {data} = await axios.get(`http://localhost:8080/api/v1/product/categorywise-product/${params.slug}`)
      // console.log(data)
      setProducts(data?.products)
      setCategory(data?.category)
    } catch (error) {
      console.log(error)
    }
  }


  
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
// useEffect(() => {
//   if (!checked.length || !radio.length) getAllProducts();
// }, [checked.length, radio.length]);

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

  return (
    <Layout title={"All Categories"}>
      <div className="d-flex">
      <div className=' d-flex flex-column p-2  sidebar'>
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

          <div className="  category background">
        {/* <h4 className="text-center H">Category - {category?.name}</h4> */}
        <h6 className="text-center HUH">{products?.length} result found </h6>
        
          
            <div className=" d-flex flex-row flex-wrap justify-content-around ">
              {products?.map((p) => (
                <div className="card m-2" key={p._id}>
                  <img
                    src={`http://localhost:8080/api/v1/product/get-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    height={"200px"}
                  />
                  <div className="card-body">
                    <div className="card-name-price">
                      <h5 className="card-title">{p.name}</h5>
                      <h5 className="card-title card-price">
                        {p.price.toLocaleString("en-US", {
                          style: "currency",
                          currency: "INR",
                        })}
                      </h5>
                    </div>
                    <p className="card-text ">
                      {p.description.substring(0, 60)}...
                    </p>
                    <div className="card-name-price">
                    <div className="d-flex button">
                          <button type="button" className="btn btn-primary" onClick={()=>{navigate(`/get-product/${p.slug}`)}}>
                          More Detail
                        </button>
                        
                        <button type="button" className="btn btn-warning ms-3" onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "Cart",
                          JSON.stringify([...cart, p])
                        );
                        toast.success("Item Added to cart");
                      }}>
                          Add to cart
                        </button></div>
                      
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
