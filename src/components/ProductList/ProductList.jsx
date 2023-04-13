import React, { useState } from "react";
import ProductItem from "./ProductItem";
import ReactLoading from "react-loading";
import { gql, useQuery, useSubscription } from "@apollo/client";
import ReactPaginate from "react-paginate";


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

function ProductList() {
  const [users, setUsers] = useState(50);
  const [pageNumber, setPageNumber] = useState(0);

  const productsPerPage = 5;
  const pageVisited =  pageNumber * productsPerPage;
  const {loading, error, data} = useQuery(RETRIEVE_PRODUCTS,
    {
      refetchQueries:[
        {
          query: RETRIEVE_PRODUCTS
      },
      'MyQuery'
      ]
    });

  const displayProducts = data?.products.slice(0, users).slice(pageVisited, pageVisited + productsPerPage).map((product) => {
    return(
      <ProductItem key={product.id} product={product} />
    )
})
  const pageCount = (data?.products.length / productsPerPage);
  const changePage = ({selected}) => {
    setPageNumber(selected)
  }
  return (
    <>
     {loading && (
          <div className="w-full bottom-1/4 mx-auto  z-20 absolute flex justify-center">
            <ReactLoading color="purple" className="my-auto mx-auto" />
          </div>
        )}
    {displayProducts}
    <div className=" w-full absolute">
    <ReactPaginate
    previousLabel={"Prev"}
    nextLabel={"Next"}
    pageCount={pageCount}
    onPageChange={changePage}
    containerClassName={"paginationBttns"}
    previousLinkClassName={"previousBttn"}
    nextLinkClassName={"nextBttn"}
    disabledLinkClassName={"paginationDisabled"}
    activeClassName={"paginationActivate"}
    />
    </div>
    </>
  );
}

export default ProductList;
