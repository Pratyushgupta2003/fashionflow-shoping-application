import React, { useEffect, useState } from 'react'
import SearchInput from '../SearchForm/SearchInput'
import "./layout.css"
import img from "../../assets/baby-sac.png"
import profileImg from "../../assets/account.png"
import { useAuth } from '../../context/auth'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import { FaShoppingCart } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import Dropdown from 'react-bootstrap/Dropdown';


export default function Navbars() {

  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);

  const getCategory = async (req, res) => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/category/get-category"
      );

      setCategories(data.category);

      //  console.log(data.category)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {

    getCategory();
    // console.log(categories);
  }, []);
  const handleOnLogout = () => {
    localStorage.removeItem("auth");
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    toast.success("Logout successfully");
    navigate("/login");
  };

const loginDisplayfun = ()=>{
  navigate("/login")
  // console.log(loginDisplay)
}
  return (
    <div className='navbar'>
      <div className='nav-logo'>
        <img src={img} alt="logo" className='nav-logo-icon' />
        <p>FashionFlow</p>
      </div>
      <div className='nav-menu'>
        <ul className='nav-menu-items '>
          <li><Link to="/" className='nav-menu-link ' >
                  Home
                </Link></li>
          <li>
          <div className='nav-category'>
                Category
                  <ul className='nav-category-dropdown '>
                  {categories.map((c) => (
                      <li key={c._id}>
                        <Link className='nav-category-link' to={`/product/${c.slug}`}>
                          {c.name}
                        </Link>
                      </li>
                    ))}
                    
                  </ul>
                </div>
          </li>
          <li><Link to="/contact" className='nav-menu-link ' >
                  Contact
                </Link></li>
          <li><Link to="/about" className='nav-menu-link ' >
                  About
                </Link></li>
        </ul>
      </div>
      <div className='nav-last-component'>

       <div className='nav-search'>
      <SearchInput/>
      </div> 

      {!auth.user ? (
                <>
                {/* <Link to="/login" >
                    
                  </Link> */}
                  
                  <button className="nav-login btn" onClick={loginDisplayfun}>Login</button>
                </>
              ) : (

                <Dropdown>
      <Dropdown.Toggle  id="dropdown-basic" className=' btn btn-light'>
      <CgProfile />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item ><Link
                    to="/user/profile" id='link'
                  >
                    Profile
                  </Link></Dropdown.Item>
        <Dropdown.Item ><Link
                    to="/user/order" id='link'
                  >
                    All Orders
                  </Link>
                  </Dropdown.Item>
        <Dropdown.Item ><Link id='link'
                    to="/dashboard/admin"
                    
                  >
                    Admin
                  </Link></Dropdown.Item>
        <Dropdown.Item ><Link id='link'
                    to="/"
                    onClick={handleOnLogout}
                  >
                    Logout
                  </Link></Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
              )}
              <button className="btn btn-light nav-login" onClick={()=>{navigate('/cart')}}>
    <FaShoppingCart />
    
              </button>
              </div>   



     
    </div>
  )
}
