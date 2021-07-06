import React, { useState, useEffect } from "react";

import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";

import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

import Spinner from "react-bootstrap/Spinner";

import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

import styled from "styled-components";

const Details = styled.p`
  display: flex;
`;

const Provider = styled.span`
  margin-right: 6px;
  text-transform: uppercase;
`;

const Date = styled.span``;

const News = () => {
  const [trendingNews, setTrendingNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
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
        if (!error.response) {
          setError("Something went wrong");
          setLoading(false);
        } else {
          setError(error.response.statusText);
          setLoading(false);
        }
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
    <div>
      <h2 className="text-center" style={{ margin: "80px 0" }}>
        Trending News
      </h2>
      <Container>
        {trendingNews.length > 0 &&
          trendingNews.map((news) => {
            var now = new window.Date();
            var then = new window.Date(news.datePublished);
            var diffMs = now - then;
            var diffDays = Math.floor(diffMs / 86400000);
            var diffHrs = Math.floor((diffMs % 86400000) / 3600000);
            var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
            let date = diffMins;
            if (diffHrs > 0) {
              date = diffHrs + " hours " + diffMins + " minutes";
            }

            if (diffDays > 0) {
              date =
                diffDays +
                " days " +
                diffHrs +
                " hours " +
                diffMins +
                " minutes";
            }
            return (
              <Card
                key={news.id}
                style={{
                  width: "90%",
                  maxWidth: "750px",
                  margin: "0 auto",
                  marginBottom: "20px",
                }}
              >
                <Card.Img variant="top" src={news.image.url} />
                <Card.Body>
                  <Card.Title>{news.title}</Card.Title>
                  <Details>
                    <Provider>{news.provider.name}</Provider>
                    <span style={{ marginRight: "6px" }}>•</span>
                    <Date>{date}</Date>
                  </Details>
                  <Card.Link href={news.url} target="_blank">
                    Read
                  </Card.Link>
                </Card.Body>
              </Card>
            );
          })}
        {trendingNews.length === 0 && (
          <p className="text-center" style={{ margin: "20px 0" }}>
            No News Found
          </p>
        )}
      </Container>
    </div>
  );
};

export default News;
