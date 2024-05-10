import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/auth';
import axios from 'axios';
import Layout from '../../components/layout/Layout';
import moment from "moment";
import { useNavigate } from 'react-router-dom';

export default function Order() {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const getOrders = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/v1/auth/orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout>
      
        
            <div className="col-md-9 container">
            <h1 className="text-center">All Orders</h1>
            {orders?.map((o, i) => {
              return (
                <div className="border shadow">
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
                        <td>{o?.status}</td>
                        <td>{o?.buyer?.name}</td>
                        <td>{moment(o?.createAt).fromNow()}</td>
                        <td>{o?.payment.success ? "Success" : "Failed"}</td>
                        <td>{o?.products?.length}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="container">
                    {o?.products?.map((p, i) => (
                      <div className="row mb-2 p-3 border shadow flex-row" key={p._id}>
                        <div className="col-md-4 shadow d-flex justify-content-center p-3">
                          <img
                           src={`http://localhost:8080/api/v1/product/get-photo/${p._id}`}
                            className=""
                            alt={p.name}
                            width={"170px"}
                            height={"100px"}
                            
                          />
                        </div>
                        <div className="col-md-8 shadow p-3">
                          <p><strong>{p.name}</strong></p>
                          <p>{p.description.substring(0, 30)}</p>
                          <p><strong>Price : </strong>Rs. {p.price}</p>
                          
                          <button type="button" className="btn btn-primary" onClick={()=>{navigate(`/get-product/${p.slug}`)}}>
                           More Detail
                         </button>
                        
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

    </Layout>
  )
}
