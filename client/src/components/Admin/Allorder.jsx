import Layout from '../layout/Layout';
import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { Select } from "antd";
import { useAuth } from '../../context/auth';
import { Link } from 'react-router-dom';
const { Option } = Select;
export default function Allorder() {

  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "deliverd",
    "cancel",
  ]);
  const [changeStatus, setCHangeStatus] = useState("");
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const getOrders = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/v1/auth/all-orders");
      setOrders(data);
      // console.log(data)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
    // console.log("h")
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(`http://localhost:8080/api/v1/auth/order-status/${orderId}`, {
        status: value,
      });
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout title={"All Orders Data"}>
      <div className="row dashboard container">
      <div className="col-md-3 p-2 mt-3">
              <ul
                className="dropdown-menu position-static d-grid gap-1 p-2 rounded-3 mx-0 shadow "
                data-bs-theme="light"
              >
                <li ><h4>Admin Dashboard</h4></li>
                <li>
                  <Link className="dropdown-item rounded-2 " to="/dashboard/admin">
                  Create Category
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item rounded-2" to="/dashboard/admin/createProduct">
                    Create Product
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item rounded-2" to="/dashboard/admin/products">
                    Products
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item rounded-2 active" to="/dashboard/admin/allorder">
                    All Orders
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item rounded-2" to="/dashboard/admin/user">
                    User
                  </Link>
                </li>
              </ul>
            </div>
        <div className="col-md-9 ">
          <h1 className="text-center H">All Orders</h1>
          {orders?.map((o, i) => {
            return (
              <div className="border shadow ">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Status</th>
                      <th scope="col">Buyer</th>
                      <th scope="col"> date</th>
                      <th scope="col">Payment</th>
                      <th scope="col">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{i + 1}</td>
                      <td>
                        <Select
                          onChange={(value) => handleChange(o._id, value)}
                          defaultValue={o?.status}
                        >
                          {status.map((s, i) => (
                            <Option key={i} value={s}>
                              {s}
                            </Option>
                          ))}
                        </Select>
                      </td>
                      <td>{o?.buyer?.name}</td>
                      <td>{moment(o?.createAt).fromNow()}</td>
                      <td>{o?.payment.success ? "Success" : "Failed"}</td>
                      <td>{o?.products?.length}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="container">
                  {o?.products?.map((p, i) => (
                    <div className="row mb-2 bor flex-row" key={p._id}>
                      <div className="col-md-4  shadow p-3 d-flex align-items-center justify-content-center">
                        <img
                          src={`http://localhost:8080/api/v1/product/get-photo/${p._id}`}
                    
                          alt={p.name}
                          width={"170px"}
                          height={"100px"}
                        />
                      </div>
                      <div className="col-md-8  shadow p-3">
                        <p><strong>{p.name}</strong></p>
                        <p>{p.description.substring(0, 30)}</p>
                        <p><strong>Price :</strong> Rs. {p.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  )
}
