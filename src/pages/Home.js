import React, { useEffect } from "react";

import Search from "../components/Search";
import News from "../components/News";

import styled from "styled-components";

const Footer = styled.div``;

const LinksContainer = styled.div`
  display: flex;
  gap: 8px;
  text-decoration: underline;
  cursor: pointer;
  @media (max-width: 750px) {
    flex-direction: column;
  }
`;

const Home = () => {
  useEffect(() => {
    document.title = `Web Search`;
  }, []);
  return (
    <div>
      <h1
        className="text-center"
        style={{ margin: "40px 0", marginTop: "20vh" }}
      >
        Web Search
      </h1>
      <Search />
      <div
        className="text-center"
        style={{
          maxWidth: "750px",
          margin: "20px auto",
        }}
      >
        Web Search offered in{" "}
        <span
          className="text-primary"
          style={{ textDecoration: "underline", cursor: "pointer" }}
        >
          english
        </span>{" "}
        <span
          className="text-primary"
          style={{ textDecoration: "underline", cursor: "pointer" }}
        >
          hindi
        </span>{" "}
        <span
          className="text-primary"
          style={{ textDecoration: "underline", cursor: "pointer" }}
        >
          tamil
        </span>{" "}
        <span
          className="text-primary"
          style={{ textDecoration: "underline", cursor: "pointer" }}
        >
          telugu
        </span>
      </div>
      <News />
      <Footer style={{ padding: "20px", marginTop: "150px" }}>
        <div>US</div>
        <hr />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <LinksContainer className="text-primary">
            <div>About</div>
            <div>Advertising</div>
            <div>Business</div>
            <div>How Search works</div>
          </LinksContainer>
          <LinksContainer className="text-primary">
            <div>Privacy</div>
            <div>Terms</div>
            <div>Settings</div>
          </LinksContainer>
        </div>
      </Footer>
    </div>
  );
};

export default Home;
