import React from "react";
import { Link } from "react-router-dom";
import ButtonHero from "../components/Button/ButtonHero";
import Hero from "../components/Header/Hero";
import InputProduct from "../components/Inputan/InputProduct";

function AddProduct() {
  return (
    <div>
      <Hero>
        Input Of Product
        <Link to={"/"}>
          <ButtonHero>Home</ButtonHero>
        </Link>
      </Hero>
      <InputProduct />
    </div>
  );
}

export default AddProduct;
