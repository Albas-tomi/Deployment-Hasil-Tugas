import { useFormik } from "formik";
import * as Yup from "yup";
import React from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { createDataProduct } from "../productsThunk";
import { gql, useMutation } from "@apollo/client";

const Schema = Yup.object({
  name: Yup.string()
    .matches(/^[a-zA-Z ]+$/)
    .min(2, 'name must be at least 2 characters')
    .max(25)
    .required(),
  price: Yup.number().min(0).required(),
  category: Yup.string().required().matches(/^[a-zA-Z0-9_-]+/),
  image: Yup.mixed().required()
  // .test("FILE_SIZE","File Size to Big", (value) => value && value < 102400)
  .test("TYPE_FILE","Invalid",(value) => value && ['image/png', 'image/jpeg'].includes(value.type)),
  description: Yup.string()
  .matches(/^[a-zA-Z ]/).required(),
  freshness: Yup.string().required().matches(/^[a-zA-Z0-9_-]+/),
});

const RETRIEVE_PRODUCTS = gql`
query MyQuery {
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

const INSERT_PRODUCT_MUTATION =gql`
mutation AddNewProducts($name: String!, $category: String!, $freshness: String!, $description: String!, $price: Int!) {
  insert_products_one(object: {category: $category, description: $description, freshness: $freshness, name: $name, price: $price}) {
    id
  }
}
`

function InputProduct() {
  const [AddNewProducts, { data, loading , error}] = useMutation(
    INSERT_PRODUCT_MUTATION,
    {
      refetchQueries:[
        {
          query: RETRIEVE_PRODUCTS
      },
      'MyQuery'
      ]
    }
    );
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      id: "",
      name: "",
      category: "",
      image: '',
      price: "",
      description: "",
      freshness: "",
    },
    validationSchema: Schema,
    onSubmit: (values, { resetForm }) => {
      swal("Good job!", "You success input new product!", "success");
      AddNewProducts({
        variables:{
          name: values.name,
          category: values.category,
          price: values.price,
          description: values.description,
          freshness: values.freshness,
        }
      });
      navigate('/')
      resetForm();
    },
  });
  return (
    <div className=" bg-slate-200 mx-auto flex flex-col items-center p-10 gap-10 ">
      <form data-testid="form" name="form" onSubmit={formik.handleSubmit}>
        <div className="flex flex-col mb-3">
          <label className="text-xl" htmlFor="name">
            Name Product
          </label>
          <p data-testid="errors" className="text-red-500">{formik.errors.name}</p>
          <input
          className="rounded-md px-2"
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
        </div>
        <div className="mb-3 rounded-md">
          <label className="text-xl" htmlFor="category">
            Product Category
          </label>
          <p data-testid="errorCategory" className="text-red-500">{formik.errors.category}</p>
          <select
            className="flex flex-col"
            id="category"
            name="category"
            value={formik.values.category}
            onChange={formik.handleChange}
          >
            <option value={"0"}>
              Choose...
            </option>
            <option value={"Category 1"}>One</option>
            <option value={"Category 2"}>Two</option>
            <option value={"Category 3"}>Three</option>
          </select>
        </div>
        <div className="mb-3 flex flex-col">
          <label className="text-xl" htmlFor="image">
            Product Image
          </label>
          <p data-testid="errorImage" className="text-red-500">{formik.errors.image}</p>
          <input
           className="rounded-md"
            type="file"
            id="image"
            accept=".jpg,.jpeg,.png"
            name="image"
            // value={formik.values.image}
            onChange={(e) => formik.setFieldValue("image", e.target.files[0])}
          />
        </div>
          <label className="text-xl mb-3 " htmlFor="freshness">Freshness</label>
        <div>
        <p data-testid="errorFreshness" className="text-red-500">{formik.errors.freshness}</p>
          <input
           className="rounded-md m-3"
            id="freshness"
            name="freshness"
            type="radio"
            checked={"New brand" === formik.values.freshness}
            onChange={formik.handleChange}
            value={"New brand"}
          />
          <label htmlFor="freshness">New brand</label>
        </div>
        <div>
          <input
          className="m-3"
            id="name"
            name="freshness"
            type="radio"
            checked={"Second brand" === formik.values.freshness}
            onChange={formik.handleChange}
            value={"Second brand"}
          />
          <label htmlFor="freshness">Second brand</label>
        </div>
        <div>
          <input
          className="m-3"
            id="name"
            name="freshness"
            type="radio"
            checked={"Old brand" === formik.values.freshness}
            onChange={formik.handleChange}
            value={"Old brand"}
          />
          <label htmlFor="freshness">Old brand</label>
        </div>
  
        <div className="mb-3 flex flex-col">
          <label className="text-xl" htmlFor="description">
            Description Product
          </label>
          <p data-testid="errorDescription" className="text-red-500">{formik.errors.description}</p>
          <textarea
          rows={5}
           className="rounded-md p-2"
            id="description"
            name="description"
            type="number"
            onChange={formik.handleChange}
            value={formik.values.description}
          />
        </div>
        <div className="mb-3 flex flex-col">
          <label className="text-xl" htmlFor="price">
            Price Product
          </label>
          <p data-testid="errorPrice" className="text-red-500">{formik.errors.price}</p>
          <input
           className="rounded-md px-2"
            id="price"
            name="price"
            type="number"
            onChange={formik.handleChange}
            value={formik.values.price}
          />
        </div>
        <button
          className="bg-green-700 hover:bg-green-800 rounded-md p-2"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default InputProduct;
