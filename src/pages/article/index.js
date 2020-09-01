import React, { useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import Loading from "../../components/loading";
import Error from "../../components/error";
import { Link } from "react-router-dom";
import TagList from "../../components/tagList";

const Article = (props) => {
  const slug = props.match.params.slug;
  const apiUrl = `/articles/${slug}`;
  const [{ isLoading, response, error }, doFetch] = useFetch(apiUrl, {});

  useEffect(() => {
    doFetch();
  }, [slug, doFetch]);

  return (
    <div className="article-page">
      <div className="banner">
        {!isLoading && response && (
          <div className="container">
            <h1>{response.article.title}</h1>
            <div className="article-meta">
              <div className="info">
                <Link to={`/profiles/${response.article.author.username}`}>
                  {response.article.author.username}
                </Link>
                <span className="date">{response.article.createdAt}</span>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="container page">
        {isLoading && <Loading />}
        {error && <Error />}
        {!isLoading && response && (
          <div className="row article-content">
            <div className="col-xs-12">
              <div>
                <p>{response.article.body}</p>
              </div>
              <TagList tags={response.article.tagList} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Article;
