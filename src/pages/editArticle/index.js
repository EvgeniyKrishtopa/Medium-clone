import React, { useEffect, useState } from "react";

import { Redirect } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import ArticleFrom from "../../components/articleForm";

const EditArticle = ({ match }) => {
  const slug = match.params.slug;
  const apiUrl = `articles/${slug}`;

  const [{ response: fetchArticleResponse }, doFetchArticle] = useFetch(
    apiUrl,
    {}
  );
  const [
    { response: updateArticleResponse, error: updateArticleError },
    doUpdateArticle,
  ] = useFetch(apiUrl, {});

  const [initialValues, setInitialValues] = useState(null);
  const [isSuccessFullSubmit, setIsSuccessFullSubmit] = useState(false);

  useEffect(() => {
    doFetchArticle();
  }, [doFetchArticle]);

  useEffect(() => {
    if (!fetchArticleResponse) {
      return;
    }

    setInitialValues({
      title: fetchArticleResponse.article.title,
      body: fetchArticleResponse.article.body,
      description: fetchArticleResponse.article.description,
      tagList: fetchArticleResponse.article.tagList,
    });
  }, [fetchArticleResponse]);

  useEffect(() => {
    if (!updateArticleResponse) {
      return;
    }
    setIsSuccessFullSubmit(true);
  }, [updateArticleResponse]);

  const handleSubmit = (article) => {
    doUpdateArticle({
      method: "put",
      data: {
        article,
      },
    });
  };

  if (isSuccessFullSubmit) {
    return <Redirect to={`/articles/${updateArticleResponse.article.slug}`} />;
  }

  return (
    <ArticleFrom
      onSubmit={handleSubmit}
      errors={(updateArticleError && updateArticleError.errors) || {}}
      initialValues={initialValues}
    />
  );
};

export default EditArticle;
