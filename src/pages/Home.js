import React, { useEffect } from "react";
import Search from "../components/Search";
import News from "../components/News";

const Home = () => {
  useEffect(() => {
    document.title = `Web Search`;
  }, []);
  return (
    <div>
      <h1 className="text-center" style={{ margin: "40px 0" }}>
        Web Search
      </h1>
      <Search />
      <News />
    </div>
  );
};

export default Home;
