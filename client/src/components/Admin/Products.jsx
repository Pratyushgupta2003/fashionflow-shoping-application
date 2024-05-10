import React, { useEffect, useState } from 'react';
import Layout from '../layout/Layout';
import { toast } from "react-toastify";
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from "axios";

export default function Products() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/v1/product/get-products");
      setProducts(data.products);
      console.log(products)
    } catch (error) {
      toast.error("Error fetching products");
      console.error("Error fetching products:", error);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <Layout>
        <div className="p-3 text-center background admin">
          <div className="row">
            <div className="col">
              <ul
                className="dropdown-menu position-static d-grid gap-1 p-2 rounded-3 mx-0 shadow w-220px"
                data-bs-theme="light"
              >
                <li><h4>Admin Dashboard</h4></li>
                <li>
                  <Link className="dropdown-item rounded-2 " to="/dashboard/admin">
                    Create Category
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item rounded-2"
                    to="/dashboard/admin/createProduct"
                  >
                    Create Product
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item rounded-2 active"
                    to="/dashboard/admin/products"
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item rounded-2" to="/dashboard/admin/allorder">
                    All orders
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item rounded-2" to="/dashboard/admin/user">
                    User
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-md-9">
              <h3 className='HUH'>Products</h3>
              <div className='d-flex flex-wrap'>
                {products.map(p => (
                  
                  <div className='m-3' key={p._id}>
                    <Link key={p._id} to={`/admin/product/${p.slug}`} style={{ textDecoration: "none" }}>
                    <Card style={{ width: '18rem' }}>
                      <Card.Img variant="top" height={"200px"} src={`http://localhost:8080/api/v1/product/get-photo/${p._id}`} />
                      <Card.Body>
                        <Card.Title>{p.name}</Card.Title>
                        {/* <Card.Text>{p.description}</Card.Text> */}
                      </Card.Body>
                    </Card>
                    </Link>
                    
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}
