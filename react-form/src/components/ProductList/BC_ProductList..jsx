import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import ProductItem from "./ProductItem";
import { createDataProduct, deleteDataProduct, getDataProduct } from "../productsThunk";
import { dataProduct, dataTypeProduct } from "./productSelector";


function ProductList() {
  const data = dataProduct();
  const dataType = dataTypeProduct()
  console.log(dataType)
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(getDataProduct());
  }, []);

  useEffect(() => {
    if(dataType === createDataProduct.fulfilled.type){
      dispatch(getDataProduct());
    }
    if(dataType === deleteDataProduct.fulfilled.type){
      dispatch(getDataProduct());
    }
  }, [dataType]);
  return (
    <>
      {data.products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
    </>
  );
}

export default ProductList;
