import React from "react";
import { useParams } from "react-router-dom";
const SearchPage = () => {
  console.log(useParams());
  return <div>search page</div>;
};

export default SearchPage;
