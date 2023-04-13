import React from "react";
import { gql, useQuery } from "@apollo/client";
import ReactLoading from "react-loading";
import { Link, useParams } from "react-router-dom";
import ButtonHero from "../Button/ButtonHero";
import DetailComment from "./DetailComment";

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


const Detail = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(RETRIEVE_PRODUCT_BY_ID, {
    variables: {
      id: parseInt(id),
    },
  });
  const product = data?.products_by_pk;
  return (
    <>
      <ButtonHero>
        <Link to={"/landing"}>Home</Link>
      </ButtonHero>
      {loading && (
        <div className="w-full h-screen  z-20 absolute flex justify-center">
          <ReactLoading color="purple" className="my-auto" />
        </div>
      )}
      <main
        key={product?.id}
        className="card w-1/2 h-full rounded-2xl overflow-hidden shadow-lg mx-auto"
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
                <p className="font-bold">{product?.name}</p>
                <p className="text-sm">{product?.description}</p>
              </div>
              <div className="flex px-3 mx-auto font-semibold">
                <div className="py-3">
                  <p>{product?.category}</p>
                </div>
              </div>
              <div className="flex px-3 mx-auto">
                <div className="flex justify-between py-3">
                  <p className="mr-5">{product?.freshness}</p>
                  <div>
                    <p className="ml-5">Rp. {product?.price}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <DetailComment />
      <h4 className="ml-4 font-bold text-2xl">Comments</h4>
      {product?.comments.length === 0 && (
          <p className="text-center mx-auto mt-4 text-red-500">
            Data tidak ditemukan.
          </p>
        )}
      {product?.comments.map((comment,idx) => (
        <div key={idx} className=" flex flex-col gap-2">
            <p className="text-start mx-auto bg-slate-400 w-1/2 border p-2 rounded" >{comment.comment}</p>
        </div>
        ))}

    </>
  );
};

export default Detail;
