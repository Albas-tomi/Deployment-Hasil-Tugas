import React from "react";
import ProductItem from "./ProductItem";
import ReactLoading from "react-loading";
import { gql, useQuery, useSubscription } from "@apollo/client";

const RETRIEVE_PRODUCTS = gql`
query MyQuery2 {
    products {
      id
      name
      category
      description
      freshness
      price
    }
  }
`
const RETRIEVE_PRODUCTS_SUBSCRIBTION = gql`
subscription MySubscription {
    products {
      id
      name
      category
      description
      freshness
      price
    }
  }
`

function ProductList() {
  const {loading, error, data} = useSubscription(RETRIEVE_PRODUCTS_SUBSCRIBTION);
  return (
    <>
    {loading&& <div className="w-full h-screen  z-20 absolute flex justify-center">
          <ReactLoading color="purple"  className="my-auto"/>
        </div>}
      {data?.products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
    </>
  );
}

export default ProductList;
