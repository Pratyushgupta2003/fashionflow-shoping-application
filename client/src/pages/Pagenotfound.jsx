import React from 'react'
import Layout from '../components/layout/Layout'
import { Link } from "react-router-dom";
export default function Pagenotfound() {
  return (
    <Layout title={"go back- page not found"}>
      <div className="container m-3 p-3">
        <h1 className="H">404</h1>
        <h2 className="H">Oops ! Page Not Found</h2>
        <Link to="/" className="pnf-btn">
          Go Back
        </Link>
      </div>
    </Layout>
  )
}
