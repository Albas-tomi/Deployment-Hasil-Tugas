import React from "react";
import { Link } from "react-router-dom";
import ButtonHero from "../components/Button/ButtonHero";
import EditProduct from "../components/EditProduct/EditProduct";
import Hero from "../components/Header/Hero";

function EditProductPage() {
  return (
    <div>
      <Hero>
        Edit Of Product
        <Link to={"/"}>
          <ButtonHero>Home</ButtonHero>
        </Link>
      </Hero>
      <EditProduct />
    </div>
  );
}

export default EditProductPage;
