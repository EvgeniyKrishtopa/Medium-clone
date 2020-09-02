import React, { useEffect, useState, useContext } from "react";
import ArticleFrom from "../../components/articleForm";
import { Redirect } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { CurrentUserContext } from "../../contexts/currentUser";

const CreateArticle = () => {
  const apiUrl = "articles";

  const [{ isLoggedIn }] = useContext(CurrentUserContext);
  const [{ error, response }, doFetch] = useFetch(apiUrl, {});

  const initialValues = {
    title: "",
    description: "",
    body: "",
    tagList: [],
  };

  const handleSubmit = (article) => {
    doFetch({
      method: "post",
      data: {
        article,
      },
    });
  };

  const [isSuccessFullSubmit, setIsSuccessFullSubmit] = useState(false);

  useEffect(() => {
    if (!response) {
      return;
    }

    setIsSuccessFullSubmit(true);
  }, [response]);

  if (isSuccessFullSubmit) {
    return <Redirect to={`/articles/${response.article.slug}`} />;
  }

  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <ArticleFrom
      errors={(error && error.errors) || null}
      initialValues={initialValues}
      onSubmit={handleSubmit}
    />
  );
};

export default CreateArticle;
