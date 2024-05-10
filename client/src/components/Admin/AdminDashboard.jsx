import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import axios from "axios";
import { toast } from "react-toastify";
import CategoryForm from "../Form/CategoryForm";
import { Modal } from "antd";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const [categories, setCategories] = useState([]);

  //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/category/get-category"
      );
      console.log(data);
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
  //create category

  const [name, setName] = useState(null);
  const createCategory = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/category/create-category",
        { name }
      );
      if (data?.success) {
        toast.success("category created");
        getAllCategory();
        setName("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("something went wrong in creating category");
    }
  };
  //update category
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedName, setUpdatedName] = useState("");
  const [selected, setSelected] = useState(null);
  const updateCategory = async (e) => {
    e.preventDefault();
    try {
      console.log(selected);
      const { data } = await axios.put(
        `http://localhost:8080/api/v1/category/update-category/${selected}`,
        { name: updatedName }
      );
      if (data?.success) {
        toast.success("category updated");
        setSelected(null);
        setIsModalOpen(false);
        setUpdatedName("");
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("something went wrong in updating category");
      console.log(error);
    }
  };
  //delete category

  async function deleteCategory(c) {
    try {
      const { data } = await axios.delete(
        `http://localhost:8080/api/v1/category/delete-category/${c}`
      );
      if (data?.success) {
        toast.success("category deleted");
        // setSelected(null)
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("something went wrong in deleting category");
      console.log(error);
    }
  }


  



  return (
    <>
      <Layout>
        <div className=" text-center p-3 admin">
          <div className="row">
            <div className="col-md-3 ">
              <ul
                className="dropdown-menu position-static d-grid gap-1 p-2 rounded-3 mx-0 shadow "
                data-bs-theme="light"
              >
                <li ><h4>Admin Dashboard</h4></li>
                <li>
                  <Link className="dropdown-item rounded-2 active" to="/dashboard/admin">
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
            <div className="col-md-9 shadow rounded-3">
              <CategoryForm
                handleOnSubmit={createCategory}
                name={name}
                setName={setName}
              />
              <table className="table  shadow">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col" colSpan={2}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((c) => (
                    <tr key={c._id}>
                      <td >{c.name}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() => {
                            setIsModalOpen(true);
                            setUpdatedName(c.name);
                            setSelected(c._id);
                          }}
                        >
                          Edit
                        </button>
                      </td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => {
                            deleteCategory(c._id);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Modal
                footer={null}
                open={isModalOpen}
                onCancel={() => {
                  setIsModalOpen(false);
                }}
              >
                <CategoryForm
                  handleOnSubmit={updateCategory}
                  name={updatedName}
                  setName={setUpdatedName}
                />
              </Modal>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
