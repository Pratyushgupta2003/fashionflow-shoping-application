import React from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../../context/search";
export default function SearchInput() {
  
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(values);
      // const { data } = await axios.get(
      //   `http://localhost:8080/api/v1/product-search/:keyword/${values.keyword}`

      // );
      const { data } = await axios.get(`http://localhost:8080/api/v1/product/product-search/${values.keyword}`);
      console.log(data);
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form
        className="d-flex search-form"
        role="search"
        onSubmit={handleSubmit}
      >
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        />
        <button className="btn btn-primary" type="submit">
          Search
        </button>
      </form>
    </div>
  )
}


