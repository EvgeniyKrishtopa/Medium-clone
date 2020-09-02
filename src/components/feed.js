import React from "react";
import { Link } from "react-router-dom";
import TagList from "./tagList";

const Feed = ({ articles }) => {
  return (
    <>
      {articles.map(
        ({ author, createdAt, slug, title, description, tagList }, index) => (
          <div className="article-preview" key={index}>
            <div className="article-meta">
              <Link to={`/profiles/${author.username}`}>
                <img src={author.image} alt="" />
              </Link>
              <div className="info">
                <Link to={`/profiles/${author.username}`} className="author">
                  {author.username}
                </Link>
                <span className="date">{createdAt}</span>
              </div>
            </div>
            <Link to={`/articles/${slug}`} className="preview-link">
              <h1>{title}</h1>
              <p style={{ overflowWrap: "break-word" }}>{description}</p>
              <span>Read more...</span>
              <TagList tags={tagList} />
            </Link>
          </div>
        )
      )}
    </>
  );
};

export default Feed;
