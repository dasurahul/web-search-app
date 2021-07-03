import React, { useState, useEffect } from "react";

import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";

import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import Spinner from "react-bootstrap/Spinner";

import styled from "styled-components";

const Details = styled.p`
  display: flex;
`;

const Provider = styled.span`
  margin-right: 6px;
  text-transform: uppercase;
`;

const Date = styled.span``;

const IconContainer = styled.div`
  cursor: pointer;
`;

const App = () => {
  const [trendingNews, setTrendingNews] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/TrendingNewsAPI",
      params: {
        pageNumber: "1",
        pageSize: "10",
        withThumbnails: "false",
        location: "us",
      },
      headers: {
        "x-rapidapi-key": "d84e7a8fb6msh1b306d85f61613ap102416jsn062c1ca70521",
        "x-rapidapi-host": "contextualwebsearch-websearch-v1.p.rapidapi.com",
      },
    };
    axios
      .request(options)
      .then(function (response) {
        setTrendingNews(response.data.value);
        setLoading(false);
      })
      .catch(function (error) {
        console.error(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "80px" }}
      >
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-center" style={{ marginBottom: "20px" }}>
        Trending News
      </h1>
      <Container>
        {trendingNews.map((news) => {
          return (
            <Card
              key={news.id}
              style={{
                width: "90%",
                maxWidth: "500px",
                margin: "0 auto",
                marginBottom: "20px",
              }}
            >
              <Card.Img variant="top" src={news.image.url} />
              <Card.Body>
                <Card.Title>{news.title}</Card.Title>
                <Card.Text>
                  {news.description.length > 50
                    ? news.description.slice(0, 50).concat("...")
                    : news.description}
                </Card.Text>
                <Details>
                  <Provider>{news.provider.name}</Provider>
                  <span style={{ marginRight: "6px" }}>•</span>
                  <Date>{news.datePublished}</Date>
                </Details>
                <Card.Link href={news.url} target="_blank">
                  Read
                </Card.Link>
              </Card.Body>
            </Card>
          );
        })}
        <IconContainer
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "10px 0",
          }}
        >
          <ExpandMoreIcon />
        </IconContainer>
      </Container>
    </div>
  );
};

export default App;
