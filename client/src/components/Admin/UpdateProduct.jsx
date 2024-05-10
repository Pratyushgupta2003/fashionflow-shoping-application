
import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Select } from "antd";
const { Option } = Select;
export default function UpdateProduct() {
  const params = useParams()
  const [id , setId] = useState("")
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [photo, setPhoto] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shiping, setShiping] = useState(true);
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

  //get current product
  const getSingleProduct = async()=>{
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/get-product/${params.slug}`
      );
      
       const data1 = data.product;
      //  console.log(data1)
      setName(data1.name);
      setId(data1._id);
      setDescription(data1.description);
      setPrice(data1.price);
      setQuantity(data1.quantity);
      setShiping(data1.shiping);
      setCategory(data1.category);
      console.log(data1.shiping)
      // setCategory(data.product.category._id);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getSingleProduct();
    getAllCategory();
    
  }, []);

  const updateProduct = async (e) => {
    e.preventDefault();

    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("category", category);
      photo && productData.append("photo", photo);
      productData.append("shiping", shiping);
      // console.log(name, description, price, quantity, category, shiping , photo);
      const { data } = await axios.put(
        `http://localhost:8080/api/v1/product/update-product/${id}`,
        productData
      );
      console.log(data);
      if (data?.success) {
        toast.success("Product Updated Successfully");
      } else {
        toast.error(data?.message);
        
        // navigate("/dashboard/admin/products");
      }
    } catch (error) {
      toast.error("something went wrong in creating category");
    }
  };
  const deleteProduct = async()=>{
    try {
      const ans = window.confirm("sure ! you want to delete this product ?")
      if(ans){
        const {data}=axios.delete(`http://localhost:8080/api/v1/product/delete-product/${id}`)
         toast.success("product deletd ")
        navigate("/admin/products")
      }
      
    } catch (error) {
      toast.error('error in deleting product')

    }
  }
  return (
    <>
      <Layout>
        <div className=" text-center background ">
          <div className="row p-3 d-flex justify-content-center">
            
            <div className="col-md-9">
              <h3 className="H">Update Product</h3>
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
                value={category}
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
                  value={shiping?"yes":"no"}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Upload new Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              {/* <div className="mb-3">
                {photo && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div> */}
              <div className="mb-3">
                {photo ? (
                  <div className="text-senter">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product photo"
                      height={"200px"}
                      className="img mig-responsive"
                    />
                  </div>
                ):
                <div className="text-senter">
                <img
                  src={`http://localhost:8080/api/v1/product/get-photo/${id}`}
                  alt="product photo"
                  height={"200px"}
                  className="img mig-responsive"
                />
              </div>
                }
              </div>
              <div>
                <button className="btn btn-primary" onClick={updateProduct}>
                  Submit
                </button>
                <button className="btn btn-danger" onClick={deleteProduct}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
