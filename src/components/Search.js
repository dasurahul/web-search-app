import React, { useState, useEffect } from "react";

import axios from "axios";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";

const Search = () => {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");
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
  return (
    <Container>
      <Form
        style={{
          width: "90%",
          margin: "20px auto",
          maxWidth: "500px",
          position: "relative",
        }}
      >
        <Form.Group style={{ paddingLeft: "38px" }}>
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
        <Form.Group
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "12px",
            marginTop: "20px",
          }}
        >
          <Button variant="outline-secondary">Web Search</Button>
          <Button variant="outline-secondary">Image Search</Button>
        </Form.Group>
        <ListGroup
          style={{ position: "absolute", zIndex: "1", left: "0", right: "0" }}
        >
          {items.map((item) => {
            return <ListGroup.Item key={item}>{item}</ListGroup.Item>;
          })}
        </ListGroup>
      </Form>
    </Container>
  );
};

export default Search;
