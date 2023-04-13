import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const getDataProduct = createAsyncThunk(
    'products/retrieveProduct',
     async () => {
    const res = await axios.get("https://642b9c11208dfe25471b6e89.mockapi.io/products");
    return  res.data;
})
export const createDataProduct = createAsyncThunk('products/createProduct',
 async (param) => {
    const res = await axios.post("https://642b9c11208dfe25471b6e89.mockapi.io/products",param);
    return  res.data;
})
export const deleteDataProduct = createAsyncThunk('products/deleteProductById',
 async (param) => {
    const res = await axios.delete(`https://642b9c11208dfe25471b6e89.mockapi.io/products/${param.id}`, param);
    return  res.data;
})
export const retrieveProductById = createAsyncThunk('products/retrieveProductById',
 async (param) => {
    const res = await axios.get(`https://642b9c11208dfe25471b6e89.mockapi.io/products/${param.id}`);
    return  res.data;
})
export const updateDataProductById= createAsyncThunk('products/updateDataById',
 async (param) => {
    const res = await axios.put(`https://642b9c11208dfe25471b6e89.mockapi.io/products/${param.id}`,
    param);
    return  res.data;
})