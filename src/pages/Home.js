import React, { useEffect } from "react";

import Search from "../components/Search";
import News from "../components/News";

const Home = () => {
  useEffect(() => {
    document.title = `Web Search`;
  }, []);
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1 className="text-center" style={{ margin: "20px 0" }}>
        Web Search
      </h1>
      <Search />
      <News />
    </div>
  );
};

export default Home;
