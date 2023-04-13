import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { deleteDataProduct } from '../productsThunk';
import { gql, useMutation } from '@apollo/client';


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

const DELETE_PRODUCT =gql`
mutation DeleteProductById($id:Int!) {
  delete_products_by_pk(id: $id) {
    id
  }
}
`
function ProductItemLogic() {
  const [deleteProductById, { data, loading , error}] = useMutation(
    DELETE_PRODUCT,
    {
      refetchQueries:[
        {
          query: RETRIEVE_PRODUCTS
      },
      'MyQuery'
      ]
    });
  const dispatch = useDispatch();

  const handleDeleteProduct = useCallback((id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProductById({
          variables:{
            id,
          }
        })
        Swal.fire("Deleted!", "Your file has been deleted.", "success",);
      }
    });
  }, []);

  return { dispatch, handleDeleteProduct };
}

export default ProductItemLogic;
