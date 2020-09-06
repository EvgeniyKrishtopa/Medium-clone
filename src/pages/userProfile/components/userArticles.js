import React, { useEffect } from "react";
import useFetch from "../../../hooks/useFetch";
import { stringify } from "query-string";
import { getPaginator, limit } from "../../../utils";
import Pagination from "../../../components/pagination";
import Loading from "../../../components/loading";
import Error from "../../../components/error";
import Feed from "../../../components/feed";

const getApiUrl = ({ username, offset, isFavorites }) => {
  const params = isFavorites
    ? { limit, offset, favorited: username }
    : { limit, offset, author: username };

  return `articles/?${stringify(params)}`;
};

const ArticlesInfo = ({ articles, total, limit, url, currentPage }) => {
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

const UserArticles = ({ username, location, isFavorites, url }) => {
  const { offset, currentPage } = getPaginator(location.search);
  const apiUrl = getApiUrl({ username, offset, isFavorites });
  const [{ response, isLoading, error }, doFetch] = useFetch(apiUrl, {});

  useEffect(() => {
    doFetch();
  }, [doFetch, isFavorites]);

  return (
    <>
      {isLoading && <Loading />}
      {error && <Error />}
      {response && (
        <ArticlesInfo
          articles={response.articles}
          total={response.articlesCount}
          limit={limit}
          url={url}
          currentPage={currentPage}
        />
      )}
    </>
  );
};

export default UserArticles;
