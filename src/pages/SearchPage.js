import React, { useState, useRef, useEffect } from "react";

import { useParams } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";

import axios from "axios";

import styled from "styled-components";

const StyledLink = styled.a`
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const SearchPage = () => {
  const { q } = useParams();
  const [webSearch, setWebSearch] = useState([]);
  const [relatedSearch, setRelatedSearch] = useState([]);
  const totalCount = useRef(0);
  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/WebSearchAPI",
      params: {
        q: q,
        pageNumber: "1",
        pageSize: "10",
        autoCorrect: "true",
      },
      headers: {
        "x-rapidapi-key": "d84e7a8fb6msh1b306d85f61613ap102416jsn062c1ca70521",
        "x-rapidapi-host": "contextualwebsearch-websearch-v1.p.rapidapi.com",
      },
    };
    axios
      .request(options)
      .then(function (response) {
        totalCount.current = response.data.totalCount;
        setWebSearch(response.data.value);
        setRelatedSearch(response.data.relatedSearch);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [q]);

  return (
    <Container>
      <Form style={{ margin: "20px 0" }}>
        <Form.Group>
          <span>
            <i
              className="fa fa-search"
              style={{
                position: "absolute",
                zIndex: "1",
                height: "38px",
                width: "38px",
                lineHeight: "38px",
                textAlign: "center",
                color: "#aaa",
              }}
            ></i>
          </span>
          <Form.Control type="text" style={{ paddingLeft: "38px" }} />
        </Form.Group>
      </Form>
      <p>About {totalCount.current} results</p>
      {webSearch.map((item) => {
        const date = new window.Date(item.datePublished).toDateString();
        return (
          <div style={{ marginBottom: "40px" }}>
            <div style={{ marginBottom: "8px" }}>{item.url}</div>
            <h5>
              <StyledLink href={item.url} target="_blank" rel="noreferrer">
                {item.title}
              </StyledLink>
            </h5>
            <div>
              {item.description.length > 120
                ? item.description.slice(0, 120).concat("...")
                : item.description}
            </div>
            <div style={{ marginBottom: "8px", color: "#666" }}>{date}</div>
          </div>
        );
      })}
      <h5>Related Searches</h5>
      <hr />
      {relatedSearch.map((item) => {
        return (
          <div>
            <p>
              <i
                className="fa fa-search"
                style={{
                  position: "relative",
                  zIndex: "1",
                  height: "38px",
                  width: "38px",
                  lineHeight: "38px",
                  textAlign: "center",
                  color: "#aaa",
                }}
              ></i>
              {item.substring(3).substring(0, item.length - 7)}
            </p>
          </div>
        );
      })}
    </Container>
  );
};

export default SearchPage;
