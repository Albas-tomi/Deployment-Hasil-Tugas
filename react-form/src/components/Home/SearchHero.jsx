import React, { useState } from "react";
import LatestSearch from "./LatestSearch"
import Search from "./Search";
import ProductCard from "../Card/ProductCard";

function SearchHero() {
  const [query, setQuery] = useState("")

  const onChangeHandler = (e) => {
     setQuery(e.target.value)
  }
  return (
    <>
    <div className="jumbroton flex items-center justify-center w-full bg-[#B8B5FF] py-10 px-3">
      <div className="w-full sm:w-4/5 md:w-3/5 xl:w-1/2">
        <h1 className="text-[25px] font-bold text-center">
          The place where all the css animation <br></br> designs in the world
        </h1>
        <h2 className="text-[14px] text-center font-light pt-3">
          Many expert developers have joined CoderAnimate <br></br> so find
          thousands of designs here
        </h2>
        <Search value={query} onChange={onChangeHandler} />
        <LatestSearch />
      </div>
    </div>

    <div className='px-5 py-2 '>
            <h1 className='font-bold text-3xl text-purple-500'>PRODUCT LIST</h1>
          </div>
        <div  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-0 py-5 gap-y-4">
        <ProductCard query={query}/>
        </div>
    </>
  );
}

export default SearchHero;
