import React from "react";
import ArticleFrom from "../../components/articleForm";

const CreateArticle = () => {
  const errors = {};
  const initialValues = {};
  const handleSubmit = (data) => {
    console.log(data);
  };
  return (
    <ArticleFrom
      errors={errors}
      initialValues={initialValues}
      onSubmit={handleSubmit}
    />
  );
};

export default CreateArticle;
