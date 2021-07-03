import React, { useState, useEffect } from "react";

import axios from "axios";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";

import { useHistory } from "react-router-dom";

import styled from "styled-components";

const StyledButton = styled(Button)`
  border: 1px solid #fff;
  color: #555;
  background-color: #fafafa;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);
  &:hover {
    border: 1px solid #ddd;
    color: #555;
    background-color: #fafafa;
  }
`;

const Search = () => {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");
  const history = useHistory();
  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/spelling/AutoComplete",
      params: { text: input },
      headers: {
        "x-rapidapi-key": "d84e7a8fb6msh1b306d85f61613ap102416jsn062c1ca70521",
        "x-rapidapi-host": "contextualwebsearch-websearch-v1.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setItems(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [input]);
  const inputHandler = (event) => {
    setInput(event.target.value);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    history.push(`/search/${input}`);
  };
  return (
    <Container>
      <Form
        style={{
          width: "90%",
          margin: "20px auto",
          maxWidth: "500px",
          position: "relative",
        }}
        onSubmit={submitHandler}
      >
        <Form.Group>
          <span
            className="fa fa-search"
            style={{
              position: "absolute",
              zIndex: "1",
              display: "block",
              width: "38px",
              height: "38px",
              lineHeight: "38px",
              textAlign: "center",
              pointerEvents: "none",
              color: "#aaa",
            }}
          ></span>
          <Form.Control
            type="text"
            onChange={inputHandler}
            value={input}
            placeholder="Search"
            style={{ paddingLeft: "38px" }}
          />
        </Form.Group>
        <ListGroup style={{ position: "absolute", zIndex: "1", width: "100%" }}>
          {items.map((item) => {
            return (
              <ListGroup.Item
                key={item}
                onClick={() => setInput(item)}
                style={{ cursor: "pointer", padding: "0" }}
              >
                <i
                  className="fa fa-search"
                  style={{
                    color: "#aaa",
                    width: "38px",
                    height: "38px",
                    lineHeight: "38px",
                    textAlign: "center",
                  }}
                ></i>
                {item}
              </ListGroup.Item>
            );
          })}
        </ListGroup>
        <Form.Group
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "12px",
            marginTop: "20px",
          }}
        >
          <StyledButton variant="outline-primary" type="submit">
            Web Search
          </StyledButton>
          <StyledButton variant="outline-primary">Image Search</StyledButton>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default Search;
