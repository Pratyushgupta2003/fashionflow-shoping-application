import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Layout from './components/layout/Layout'
import Homepage from './pages/Homepage'
import Category from './pages/Category'
import About from './pages/About'
import Contact from './pages/Contact'
import Pagenotfound from './pages/Pagenotfound'
import { Routes,Route } from 'react-router-dom'
import Login from '../auth/Login'
import Register from '../auth/Register'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Private from './Route/Private'
import Forgot from '../auth/Forgot'
import Dashboard from './pages/User/Dashboard'
import AdminDashboard from './components/Admin/AdminDashboard'
import CreateProduct from './components/Admin/CreateProduct'
import Products from './components/Admin/Products'
import UpdateProduct from './components/Admin/UpdateProduct'
import Search from './pages/Search'
import ProductDetail from './pages/ProductDetail'
import CartPage from './pages/CartPage'
import UserProfile from './pages/UserProfile'
import Order from './pages/User/Order'
import Allorder from './components/Admin/Allorder'
import AdminRoute from './Route/AdminRoute'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
      <Route path="/" element={<Homepage/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/conatct" element={<Contact/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/forgot" element={<Forgot/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          
      <Route path="admin/createProduct" element={<CreateProduct/>}/>
      <Route path="admin/products" element={<Products/>}/>
      <Route path="admin/product/:slug" element={<UpdateProduct/>}/>
      <Route path="admin/allorder" element={<Allorder/>}/>
      <Route path="admin/user" element={<AdminDashboard/>}/>
      </Route>
      {/* <Route path="/dashboard" element={<Private/>}>
        <Route path="" element={<Dashboard/>}/>
      </Route>
      <Route path="/dashboard" element={<AdminRoute/>}>
        <Route path="admin" element={<AdminDashboard/>}/>
      </Route> */}
      <Route path="/ddashboard" element={<Dashboard/>}/>
      <Route path="/search" element={<Search/>}/>
      <Route path="/get-product/:slug" element={<ProductDetail/>}/>
      <Route path="/product/:slug" element={<Category/>}/>
      <Route path="/cart" element={<CartPage/>}/>
      <Route path="/user/profile" element={<UserProfile/>}/>
      <Route path="/user/order" element={<Order/>}/>
      
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<Pagenotfound />} />
    </Routes>

    
      
      
    </>
  )
}

export default App
