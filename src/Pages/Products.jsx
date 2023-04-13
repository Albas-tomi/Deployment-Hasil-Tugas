import React from "react";
import { Link } from "react-router-dom";
import ButtonHero from "../components/Button/ButtonHero";
import Hero from "../components/Header/Hero";
import ProductList from "../components/ProductList/ProductList";
import { useSelector } from "react-redux";
import ReactLoading from "react-loading";
function Products() {
  const data = useSelector((state) => {
    return state.products;
  });
  return (
    <div>
        <Link to={"/landing"}>
          <ButtonHero>Home</ButtonHero>
        </Link>
      <Hero>
        List Of Product's
        <Link to={"/add-product"}>
          <ButtonHero>Add New Product</ButtonHero>
        </Link>
      </Hero>
      {data.loading && (
        <div className="w-full h-screen  z-20 absolute flex justify-center">
          <ReactLoading color="purple"  className="my-auto"/>
        </div>
      )}
      <table className="table-fixed border text-center w-full">
        <thead className="bg-gray-200 h-12">
          <tr>
            <th>No</th>
            <th>Name </th>
            <th>Category</th>
            <th>Image</th>
            <th> Freshness</th>
            <th> Description</th>
            <th>Product Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <ProductList />
        </tbody>
      </table>
    </div>
  );
}

export default Products;
