import React, { useState, useEffect } from "react";
import BackendErrorMessages from "../components/backendErrorMessages";

const ArticleFrom = ({ onSubmit, errors, initialValues }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [description, setDescription] = useState("");
  const [tagList, setTagList] = useState("");

  useEffect(() => {
    if (!initialValues) {
      return;
    }

    setTitle(initialValues.title);
    setBody(initialValues.body);
    setDescription(initialValues.description);
    setTagList(initialValues.tagList.join(" "));
  }, [initialValues]);

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({ title, body, description, tagList });
  };

  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            {errors && <BackendErrorMessages backendError={errors.errors} />}
            <form onSubmit={handleSubmit}>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control from-control-lg"
                    type="text"
                    placeholder="Article title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </fieldset>

                <fieldset className="form-group">
                  <input
                    className="form-control from-control-lg"
                    type="text"
                    placeholder="What is this article about?"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                  />
                </fieldset>

                <fieldset className="form-group">
                  <textarea
                    rows="8"
                    className="form-control"
                    placeholder="Write your article (in markdown)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </fieldset>

                <fieldset className="form-group">
                  <input
                    className="form-control from-control-lg"
                    type="text"
                    placeholder="Enter tags"
                    value={tagList}
                    onChange={(e) => setTagList(e.target.value)}
                  />
                </fieldset>

                <fieldset className="form-group">
                  <button
                    type="submit"
                    className="btn btn-lg pull-xs-right btn-primary"
                  >
                    Publish Article
                  </button>
                </fieldset>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleFrom;
