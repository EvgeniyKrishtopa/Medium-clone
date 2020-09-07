import React, { useEffect, useContext } from "react";
import useFetch from "../../hooks/useFetch";
import Feed from "../../components/feed";
import PopularTags from "../../components/popularTags";
import Loading from "../../components/loading";
import Error from "../../components/error";
import FeedToggler from "../../components/feedToggler";
import { limit, getPaginator } from "../../utils";
import { CurrentUserContext } from "../../contexts/currentUser";
import Pagination from "../../components/pagination";

const CurrentUserArticlesInfo = ({
  articles,
  total,
  limit,
  url,
  currentPage,
}) => {
  if (articles.length) {
    return (
      <>
        <Feed articles={articles} />
        <Pagination
          total={total}
          limit={limit}
          url={url}
          currentPage={currentPage}
        />
      </>
    );
  }
  return <p>No articles are here... yet.</p>;
};

const YourFeed = ({ location, match }) => {
  const { offset, currentPage } = getPaginator(location.search);
  const [{ currentUser }] = useContext(CurrentUserContext);
  const apiUrl =
    currentUser &&
    `articles?author=${currentUser.username}&limit=${limit}&offset=${offset}`;
  const [{ response, isLoading, error }, doFetch] = useFetch(apiUrl, {});

  useEffect(() => {
    if (apiUrl) {
      doFetch();
    }
  }, [doFetch, currentPage, apiUrl]);

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
                articles={response.articles}
                limit={limit}
                currentPage={currentPage}
                total={response.articlesCount}
                url={match.url}
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
