import React, { useEffect, useContext, useState } from "react";
import useFetch from "../../hooks/useFetch";
import Loading from "../../components/loading";
import Error from "../../components/error";
import { Link } from "react-router-dom";
import TagList from "../../components/tagList";
import { CurrentUserContext } from "../../contexts/currentUser";
import { Redirect } from "react-router-dom";

const Article = (props) => {
  const slug = props.match.params.slug;
  const apiUrl = `articles/${slug}`;
  const [isSuccessfullDelete, setIsSuccesfullDelete] = useState(false);
  const [{ isLoading, response, error }, doFetch] = useFetch(apiUrl, {});
  const [{ response: deleteArticleResponse }, doDeleteArticle] = useFetch(
    apiUrl,
    {}
  );
  const [currentUserState] = useContext(CurrentUserContext);

  const isAuthor = () => {
    if (!response || !currentUserState.isLoggedIn) {
      return false;
    }

    return (
      response.article.author.username === currentUserState.currentUser.username
    );
  };

  const deleteArticle = () => {
    doDeleteArticle({
      method: "delete",
    });
  };

  useEffect(() => {
    doFetch();
  }, [slug, doFetch]);

  useEffect(() => {
    if (!deleteArticleResponse) {
      return;
    }

    setIsSuccesfullDelete(true);
  }, [deleteArticleResponse, setIsSuccesfullDelete]);

  if (isSuccessfullDelete) {
    return <Redirect to="/" />;
  }

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
              {isAuthor() && (
                <span>
                  <Link
                    className="btn btn-outline-secondary btn-sm"
                    to={`/articles/${response.article.slug}/edit`}
                  >
                    <i className="ion-edit"></i>
                    Edit Article
                  </Link>
                  &nbsp;&nbsp;
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={deleteArticle}
                  >
                    Delete article
                  </button>
                </span>
              )}
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
