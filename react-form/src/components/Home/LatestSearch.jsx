import React from "react";
import ItemSearch from "./ItemSearch";

function LatestSearch() {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center ">
      <h2 className="mx-4 mt-4">Latest Search</h2>
      <div className="flex flex-wrap justify-center">
        <ItemSearch />
        <ItemSearch />
      </div>
    </div>
  );
}

export default LatestSearch;
