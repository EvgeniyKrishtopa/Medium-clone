import React, { useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import Feed from "../../components/feed";
import Pagination from "../../components/pagination";
import { limit, getPaginator } from "../../utils";

const GlobalFeed = ({ location, match }) => {
  const { offset, currentPage } = getPaginator(location.search);
  const apiUrl = `articles?limit=${limit}&offset=${offset}`;
  const [{ response, isLoading, error }, doFetch] = useFetch(apiUrl, {});

  useEffect(() => {
    doFetch();
  }, [doFetch, currentPage]);

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
            {isLoading && <p>Loading...</p>}
            {error && <p>Some error happened!</p>}
            {!isLoading && response && (
              <>
                <Feed articles={response.articles} />
                <Pagination
                  total={response.articlesCount}
                  limit={limit}
                  url={match.url}
                  currentPage={currentPage}
                />
              </>
            )}
          </div>
          <div className="col-md-3">Popular tags</div>
        </div>
      </div>
    </div>
  );
};

export default GlobalFeed;
