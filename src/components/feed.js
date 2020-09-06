import React from "react";
import { Link } from "react-router-dom";
import TagList from "./tagList";
import AddToFavorites from "./addToFavorites";

const Feed = ({ articles }) => {
  if (!articles) {
    return;
  }

  return (
    <>
      {articles.map(
        (
          {
            author,
            createdAt,
            title,
            description,
            tagList,
            favorited,
            favoritesCount,
            slug,
          },
          index
        ) => (
          <div className="article-preview" key={index}>
            <div className="article-meta">
              <Link to={`/profiles/${author.username}`}>
                <img
                  src="https://static.productionready.io/images/smiley-cyrus.jpg"
                  alt=""
                />
              </Link>
              <div className="info">
                <Link to={`/profiles/${author.username}`} className="author">
                  {author.username}
                </Link>
                <span className="date">{createdAt}</span>
              </div>
              <div className="pull-xs-right">
                <AddToFavorites
                  isFavorited={favorited}
                  isFavoritesCount={favoritesCount}
                  isArticleSlug={slug}
                />
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
