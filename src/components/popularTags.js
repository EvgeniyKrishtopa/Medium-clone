import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import Loading from "./loading";
import Error from "./error";
import { Link } from "react-router-dom";

const PopularTags = () => {
  const [{ response, isLoading, error }, doFetch] = useFetch("tags", {});
  const [filteredTags, setFilteredTags] = useState([]);

  useEffect(() => {
    doFetch();
  }, [doFetch]);

  useEffect(() => {
    if (response) {
      const tags = response.tags
        .map((tag) => tag.replace(/\u200c/g, ""))
        .filter((tag) => tag.length !== 0);
      setFilteredTags(tags);
    }
  }, [response]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <div className="sidebar">
      <p>Popular tags</p>
      <div className="tag-list">
        {!isLoading &&
          response &&
          filteredTags &&
          filteredTags.map((tag, index) => (
            <Link
              to={`/tags/${tag}`}
              className="tag-default tag-pill"
              key={index}
            >
              {tag}
            </Link>
          ))}
      </div>
    </div>
  );
};

export default PopularTags;
