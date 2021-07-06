import React, { useState, useRef, useEffect } from "react";

import axios from "axios";

import { useParams } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";

import Spinner from "react-bootstrap/Spinner";

import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

import ListGroup from "react-bootstrap/ListGroup";

import { useHistory } from "react-router-dom";

import Breadcrumb from "react-bootstrap/Breadcrumb";

import Pagination from "@material-ui/lab/Pagination";

import styled from "styled-components";

const Url = styled.div`
  margin-bottom: 8px;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const StyledLink = styled.a`
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const SearchPage = () => {
  const { q } = useParams();
  const [input, setInput] = useState(q);
  const [webSearch, setWebSearch] = useState([]);
  const [relatedSearch, setRelatedSearch] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);
  const totalCount = useRef(0);
  const [currentPage, setCurrentPage] = useState(1);
  const history = useHistory();

  const updateTitle = (value) => {
    document.title = value;
  };

  const inputHandler = (event) => {
    setIsInvalid(false);
    setInput(event.target.value);
  };

  const get = (value, pageNumber = 1) => {
    setLoading(true);
    const options = {
      method: "GET",
      url: "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/WebSearchAPI",
      params: {
        q: value,
        pageNumber: pageNumber,
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
        setLoading(false);
      })
      .catch(function (error) {
        if (!error.response) {
          setError("Something went wrong");
          setLoading(false);
        } else {
          setError(error.response.statusText);
          setLoading(false);
        }
      });
  };
  const submitHandler = (event) => {
    event.preventDefault();
    if (input.trim().length === 0) {
      setIsInvalid(true);
      return;
    }
    history.push(`/search/${input}`);
    setCurrentPage(1);
  };
  useEffect(() => {
    get(q);
    updateTitle(`${q} - Web Search`);
  }, [q]);

  const numberOfPages = Math.ceil(totalCount.current / 10);

  const handleChange = (event, page) => {
    get(input, page);
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "80px" }}
      >
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "80px" }}
      >
        <ErrorOutlineIcon style={{ marginRight: "6px" }} />
        {error}
      </div>
    );
  }

  return (
    <Container style={{ maxWidth: "750px" }}>
      <h2
        className="text-center"
        style={{ margin: "20px 0", cursor: "pointer" }}
        onClick={() => history.push("/")}
      >
        Web Search
      </h2>
      <Form style={{ margin: "20px 0" }} onSubmit={submitHandler}>
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
          <Form.Control
            type="text"
            style={{ paddingLeft: "38px" }}
            onChange={inputHandler}
            value={input}
            isInvalid={isInvalid}
            onBlur={() => {
              setIsInvalid(false);
            }}
          />
        </Form.Group>
      </Form>
      <Breadcrumb>
        <Breadcrumb.Item onClick={() => history.push("/")}>
          Web Search
        </Breadcrumb.Item>
        <Breadcrumb.Item active>{q}</Breadcrumb.Item>
      </Breadcrumb>
      <p>About {totalCount.current} results</p>
      {webSearch.map((item) => {
        return (
          <div key={item.url} style={{ marginBottom: "40px" }}>
            <Url>{item.url}</Url>
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
            <div style={{ marginBottom: "8px", color: "#666" }}>
              By {item.provider.name.toUpperCase()}
            </div>
          </div>
        );
      })}
      {relatedSearch.length > 0 && (
        <div>
          <h5>Related Searches</h5>
          <hr />
          <ListGroup style={{ marginBottom: "20px" }}>
            {relatedSearch.map((item) => {
              let itemString = item.replace(/(<([^>]+)>)/gi, "");
              return (
                <ListGroup.Item
                  key={item}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setInput(itemString);
                    history.push(`/search/${itemString}`);
                  }}
                >
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
                  {itemString}
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </div>
      )}
      <Pagination
        style={{ marginBottom: "20px" }}
        count={numberOfPages}
        page={currentPage}
        onChange={handleChange}
        shape="rounded"
      />
    </Container>
  );
};

export default SearchPage;
