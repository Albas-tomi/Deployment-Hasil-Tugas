import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import ReactLoading from "react-loading";

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
`;
function ProductCard(props) {
  const { loading, error, data } = useQuery(RETRIEVE_PRODUCTS);
  const [noOfElement, setNoOfElement] = useState(3);
  const loadMore = () => {
    setNoOfElement(noOfElement + noOfElement);
  };
  return (
    <>
     {loading&& <div className="w-full h-screen  z-20 absolute flex justify-center">
          <ReactLoading color="purple"  className="my-auto"/>
        </div>}
      {data?.products
        .slice(0, noOfElement)
        .filter((product) => product.name.toLowerCase().includes(props.query))
        .map((product) => (
          <main
            key={product.id}
            className="card w-[350px] h-full rounded-2xl overflow-hidden shadow-lg mx-auto"
          >
            <div className="container mx-auto px-3 py-8 sm:flex sm:flex-wrap sm:gap-6 sm:justify-center">
              <div className="rounded-2xl shadow-lg overflow-hidden">
                <div className=" relative w-92 h-fit">
                  <img
                    src="https://source.unsplash.com/600x400"
                    alt="image caption"
                    className="w-auto rounded-b-2xl cursor-pointer h"
                  />
                </div>
                <div className="px-1 py-4 mx-auto flex flex-col justify-between ">
                  <div className="font-thin text-xl mb-2 text-slate-700 px-1 py-1 flex-auto">
                    <p className="font-bold">{product.name}</p>
                    <p className="text-sm">{product.description}</p>
                  </div>
                  <div className="flex px-3 mx-auto font-semibold">
                    <div className="py-3">
                      <p>{product.category}</p>
                    </div>
                  </div>
                  <div className="flex px-3 mx-auto">
                    <div className="flex justify-between py-3">
                      <p className="mr-5">{product.freshness}</p>
                      <div>
                        <p className="ml-5">Rp. {product.price}</p>
                      </div>
                    </div>
                  </div>
                  <Link to={`/detail/${product.id}`} className="mx-auto text-center w-1/2 bg-purple-300 rounded-md p-2  hover:bg-purple-500 duration-500 ">
                  <button>
                    View Detail
                  </button>
                  </Link>
                </div>
              </div>
            </div>
          </main>
        ))}
        {data?.products.length === 0 && (
          <p className="text-center mx-auto mt-4 text-red-500">
            Data tidak ditemukan.
          </p>
        )}
      <button
        onClick={() => loadMore()}
        className="bg-purple-900 h-8 hover:bg-purple-600 duration-500 w-1/4 mx-5 text-white p-1 rounded"
      >
        Load More
      </button>
    </>
  );
}

export default ProductCard;
