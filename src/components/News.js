import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import allNews from "./Data";
const News = (props) => {
  const [selectedCat, setSelectedCat] = useState("general");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async () => {
    props.setProgress(10);
    setLoading(true);
    let data = await fetch(articles);
    props.setProgress(100);
    let parsedData = await data.json();
    props.setProgress(100);

    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
  };

  useEffect(() => {
    let dataFilter = allNews.filter((data) => data.category == selectedCat);

    setArticles(dataFilter);
  }, []);

  useEffect(() => {
    let dataFilter = allNews.filter((data) => data.category == selectedCat);

    setArticles(dataFilter);
  }, [selectedCat]);

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(selectedCat)} - News Monkey`;
    updateNews();
  }, []);

  const fetchMoreData = async () => {
    const articles = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&category=${props.category}&apiKey=${props.apiKey}&page=${
      page + 1
    }&pageSize=${props.pageSize}`;
    setPage(page + 1);

    let data = await fetch(articles);
    let parsedData = await data.json();

    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
  };
let myStyle={
  backgroundColor:'#06090A'
}
  return (
    <div className="bckcolor" style={myStyle}>
    <>
      <h1
        className="text-center txtcolor"
        style={{ margin: "30px 0px", marginTop: "42px" }}
      >
        Newsonkey - Top <span style={{ color: "red" }}>{capitalizeFirstLetter(selectedCat)}</span>{" "}
        Headlines
      </h1>

      <div>
        <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <li className="custn">NewsMonkey</li>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <li
                    className="nav-link active"
                    aria-current="page"
                    onClick={() => setSelectedCat("general")}
                  >
                    
                    Home
                  </li>
                </li>
                <li
                  className="nav-item nav-link"
                  data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show"
                  onClick={() => setSelectedCat("general")}
                >
                  General
                </li>
                <li
                  className="nav-item nav-link"
                  data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show"
                  
                  onClick={() => setSelectedCat("business")}
                >
                  Business
                </li>
                <li
                  className="nav-item nav-link"
                  data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show"
                  onClick={() => setSelectedCat("entertainment")}
                >
                  Entertainment
                </li>
                <li
                  className="nav-item nav-link"
                  data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show"
                  onClick={() => setSelectedCat("health")}
                >
                  health
                </li>
                <li
                  className="nav-item nav-link"
                  data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show"
                  onClick={() => setSelectedCat("science")}
                >
                  science
                </li>
                <li
                  className="nav-item nav-link"
                  data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show"
                  onClick={() => setSelectedCat("sports")}
                >
                  sports
                </li>
                <li
                  className="nav-item nav-link"
                  data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show"
                  onClick={() => setSelectedCat("technology")}
                >
                  technology
                </li>
                <li
                  className="nav-item nav-link"
                  data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show"
                  
                >
                  Dark Mode
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>

      <div className="container bckcolor">
        <div className="row bckcolor">
          {articles.map((element, idx) => {
            return (
              <div key={idx} className="col-md-4" key={element.articles}>
                <NewsItem
                  title={element.title ? element.title.slice(0, 30) : ""}
                  description={
                    element.description ? element.description.slice(0, 88) : ""
                  }
                  imagearticles={element.urlToImage}
                  newsarticles={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
    </div>
  );
  // }..class based
};

News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
