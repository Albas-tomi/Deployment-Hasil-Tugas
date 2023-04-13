import { useFormik } from "formik";
import * as Yup from "yup";
import React from "react";
import swal from "sweetalert";
import { useParams } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import ReactLoading from "react-loading";


const RETRIEVE_PRODUCT_BY_ID = gql`
  query retrieveProductById($id: Int!) {
    products_by_pk(id: $id) {
      category
      description
      freshness
      id
      name
      price
      comments {
        comment
      }
    }
  }
`;

const INSERT_COMMENT_MUTATION =gql`
mutation addNewComment ($comment: String!, $id:Int!, $product_id:Int!) {
    insert_comments_one(object: {comment: $comment, id:$id, product_id:$product_id}) {
      id
    }
  }
`

const Schema = Yup.object({
    comment: Yup.string()
    .min(2, 'name must be at least 2 characters')
    .required(),
});


function DetailComment() {
    const now = new Date();
    const { id } = useParams();
    const [addNewComment, { data, loading , error}] = useMutation(
        INSERT_COMMENT_MUTATION,
        {
          refetchQueries:[
            {
              query: RETRIEVE_PRODUCT_BY_ID
          },
          'retrieveProductById'
          ]
        }
        );
  const formik = useFormik({
    initialValues: {
        id: Math.floor(Math.random() * 1000000),
        product_id:id,
      comment: "",
    },
    validationSchema: Schema,
    onSubmit: (values, { resetForm }) => {
        addNewComment({
            variables:{
               comment: values.comment,
               id: values.id,
               product_id: values.product_id
            }
          });
      swal("Good job!", "You success add Comment", "success");
      resetForm();
    },
  });
  return (
    <div className=" mx-auto flex flex-col items-center p-10 gap-10 ">
         {loading && (
          <div className="w-ful top-1/4 z-20 absolute flex justify-center">
            <ReactLoading color="purple" className="my-auto" />
          </div>
        )}
      <form data-testid="form" name="form" onSubmit={formik.handleSubmit}>
        <div className="flex flex-col mb-3">
          <label className="text-xl" htmlFor="comment">
            Add Your's Comments
          </label>
          <input
          className="rounded-md px-2 border "
            id="comment"
            name="comment"
            type="text"
            placeholder="comments"
            onChange={formik.handleChange}
            value={formik.values.comment}
          />
        </div>
        <button
          className="bg-green-700 hover:bg-green-800 rounded-md p-1"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default DetailComment;
