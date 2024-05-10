import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Select } from "antd";
const { Option } = Select;
export default function CreateProduct() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [photo, setPhoto] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shiping, setShiping] = useState("");
  const navigate = useNavigate();
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/category/get-category"
      );
      // console.log(data);
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wwent wrong in getting catgeory");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const createProduct = async (e) => {
    e.preventDefault();

    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("category", category);
      productData.append("photo", photo);
      productData.append("shiping", shiping);
      console.log(name, description, price, quantity, category, shiping , photo);
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/product/create-product",
        productData
      );
      console.log(data);
      if (data?.success) {
        toast.success("product created");
        // navigate("/admin");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("something went wrong in creating category");
    }
  };
  return (
    <>
      <Layout>
        <div className="admin text-center">
          <div className="row">
            <div className="col-md-3 m-1 mt-3 ">
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
                    className="dropdown-item rounded-2 active"
                    to="/dashboard/admin/createProduct"
                  >
                    Create Product
                  </Link>
                </li>
                
                <li>
                  <Link
                    className="dropdown-item rounded-2 "
                    to="/dashboard/admin/products"
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item rounded-2" to="/dashboard/admin/allorder">
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
            <div className="col-md-7 m-1">
              <h1 className="H">Create Product</h1>
              <div>
              <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
                <div className="mb-3">
                  <input
                    type="text"
                    value={name}
                    placeholder="Enter name"
                    className="form-control"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={description}
                    placeholder="Enter description"
                    className="form-control"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="number"
                    value={quantity}
                    placeholder="Enter Quantity"
                    className="form-control"
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="number"
                    value={price}
                    placeholder="Enter price"
                    className="form-control"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <Select
                  bordered={false}
                  placeholder="Select Shipping "
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setShiping(value);
                  }}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              
              <div className="mb-3">
                {photo && (
                  <div className="text-senter">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product photo"
                      height={"200px"}
                      className="img mig-responsive"
                    />
                  </div>
                )}
              </div>
              <div>
                <button className="btn btn-primary" onClick={createProduct}>
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
