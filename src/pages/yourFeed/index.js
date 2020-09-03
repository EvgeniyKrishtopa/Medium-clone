import React, { useEffect, useContext, useState } from "react";
import useFetch from "../../hooks/useFetch";
import Feed from "../../components/feed";
import PopularTags from "../../components/popularTags";
import Loading from "../../components/loading";
import Error from "../../components/error";
import FeedToggler from "../../components/feedToggler";
import { limit, getPaginator } from "../../utils";
import { CurrentUserContext } from "../../contexts/currentUser";

const CurrentUserArticlesInfo = ({ currentUserArticles }) => {
  if (currentUserArticles.length) {
    return <Feed articles={currentUserArticles} />;
  }
  return <p>No articles are here... yet.</p>;
};

const YourFeed = ({ location }) => {
  const { offset, currentPage } = getPaginator(location.search);
  const apiUrl = `articles?limit=${limit}&offset=${offset}`;
  const [currentUserArticles, setCurrentUserArticles] = useState([]);
  const [{ response, isLoading, error }, doFetch] = useFetch(apiUrl, {});
  const [{ currentUser }] = useContext(CurrentUserContext);

  useEffect(() => {
    doFetch();
  }, [doFetch, currentPage]);

  useEffect(() => {
    if (response && currentUser) {
      const filteredArticles = response.articles.filter((item) => {
        return item.author.username === currentUser.username;
      });

      setCurrentUserArticles(filteredArticles);
    }
  }, [response, currentUser]);

  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1>Medium-clone</h1>
          <p>A place to share knowledge</p>
        </div>
      </div>
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <FeedToggler />
            {isLoading && <Loading />}
            {error && <Error />}
            {!isLoading && response && (
              <CurrentUserArticlesInfo
                currentUserArticles={currentUserArticles}
              />
            )}
          </div>
          <div className="col-md-3">
            <PopularTags />
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourFeed;
