import React, { useState, useEffect } from "react";

import axios from "axios";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";

import { useHistory } from "react-router-dom";

import styled from "styled-components";

const StyledButton = styled(Button)`
  border: 1px solid #ccc;
  color: #555;
  background-color: #fff;
  &:hover {
    border: 1px solid #ccc;
    color: #555;
    background-color: #fff;
  }
`;

const Search = () => {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);
  const history = useHistory();
  useEffect(() => {
    let mounted = true;
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
        if (mounted) {
          setItems(response.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    return () => {
      mounted = false;
    };
  }, [input]);
  const inputHandler = (event) => {
    setIsInvalid(false);
    setInput(event.target.value);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    if (input.trim().length === 0) {
      setIsInvalid(true);
      return;
    }
    history.push(`/search/${input}`);
  };
  return (
    <Container>
      <Form
        style={{
          width: "90%",
          margin: "20px auto",
          maxWidth: "750px",
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
            isInvalid={isInvalid}
            onBlur={() => {
              setIsInvalid(false);
            }}
          />
        </Form.Group>
        <ListGroup
          style={{
            position: "absolute",
            zIndex: "1",
            width: "100%",
          }}
        >
          {items.map((item) => {
            return (
              <ListGroup.Item
                key={item}
                onClick={() => {
                  setInput(item);
                  history.push(`/search/${item}`);
                }}
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
