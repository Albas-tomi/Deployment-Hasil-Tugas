import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import ReactLoading from "react-loading";
import { gql, useMutation, useQuery } from "@apollo/client";


const Schema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[a-zA-Z ]/)
    .min(2)
    .max(25)
    .required(),
  price: Yup.number().min(0).required(),
  category: Yup.string()
    .required()
    .matches(/^[a-zA-Z0-9_-]+/),
  image: Yup.string().required(),
  freshness: Yup.string()
    .required()
    .matches(/^[a-zA-Z0-9_-]+/),
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


const UPDATE_PRODUCT_BY_ID =gql`
mutation updateProductById($id:Int!, $name:String!, $category:String!, $description:String!, $freshness:String!, $price:Int!) {
  update_products_by_pk(pk_columns: { id: $id }, _set: { category: $category, description: $description, freshness: $freshness, name: $name, price: $price }) {
    id
  }
}
`
const RETRIEVE_PRODUCT_BY_ID =gql`
query retrieveProductById($id:Int!) {
  products_by_pk(id:$id) {
    category
    description
    freshness
    id
    name
    price
  }
}
`
function EditProduct() {
  const { id } = useParams();
  const {loading:loadingProduct, error:errorProduct, data:retrieveProduct} = useQuery(RETRIEVE_PRODUCT_BY_ID, {
    variables: {
      id: parseInt(id)
    }
  });  
  const product = retrieveProduct?.products_by_pk;
  const [updateProductById, { data, loading }] = useMutation( UPDATE_PRODUCT_BY_ID,
    {
      refetchQueries:[
        {
          query: RETRIEVE_PRODUCTS
      },
      'MyQuery'
      ]
    });


  // console.log(product)
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: product?.name || '',
      category: product?.category || '',
      description: product?.description || '',
      price: product?.price || '',
      freshness: product?.freshness || '',
    },
    validationSchema: Schema,
    onSubmit: (values, { resetForm }) => {
      swal("Good job!", "You success Edit product!", "success");
      updateProductById({
        variables: { id, ...values },
      });
      resetForm();
      navigate("/");
    },
    enableReinitialize: true,
  });
  return (
    <div className=" bg-slate-200 mx-auto flex flex-col items-center p-10 gap-10 ">
        {loading || loadingProduct && (
          <div className="w-full h-screen bg-purple-300  z-20 absolute flex justify-center">
            <ReactLoading color="purple" className="my-auto" />
          </div>
        )}
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col mb-3">
          <label className="text-xl" htmlFor="name">
            Name Product
          </label>
          {formik.errors.name && (
            <p className="text-red-500">{formik.errors.name}</p>
          )}
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
          {formik.errors.category && (
            <p className="text-red-500">{formik.errors.category}</p>
          )}
          <select
            className="flex flex-col"
            id="category"
            name="category"
            value={formik.values.category}
            onChange={formik.handleChange}
          >
            <option value={"0"}>Choose...</option>
            <option value={"Category 1"}>One</option>
            <option value={"Category 2"}>Two</option>
            <option value={"Category 3"}>Three</option>
          </select>
        </div>
        <div className="mb-3 flex flex-col">
          <label className="text-xl" htmlFor="category">
            Product Image
          </label>
          {formik.errors.image && (
            <p className="text-red-500">{formik.errors.image}</p>
          )}
          <input
            className="rounded-md"
            type="file"
            name="image"
            accept=".jpg,.jpeg,.png"
            value={formik.values.image}
            onChange={formik.handleChange}
          />
        </div>
        <div>
          <div className="text-xl mb-3 ">Freshness</div>
          {formik.errors.freshness && (
            <p className="text-red-500">{formik.errors.freshness}</p>
          )}
          <input
            className="rounded-md m-3"
            id="name"
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
          <label className="text-xl" htmlFor="price">
            Descripion Product
          </label>
          {formik.errors.description && (
            <p className="text-red-500">{formik.errors.description}</p>
          )}
          <textarea
            rows={5}
            className="rounded-md p-2"
            id="name"
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
          {formik.errors.price && (
            <p className="text-red-500">{formik.errors.price}</p>
          )}
          <input
            className="rounded-md px-2"
            id="name"
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

export default EditProduct;
