import { useSelector } from "react-redux";

export const dataProduct = () => useSelector((state) => {
    return state.products;
  });
export const loadingProduct = () => useSelector((state) => {
    return state.products.ProductIdLoading;
  });
export  const dataTypeProduct= () =>useSelector((state) => {
    return state.products.type;
  });
export  const dataProductEdit = () =>useSelector((state) => {
    return state.products.productEditDetail;
  });