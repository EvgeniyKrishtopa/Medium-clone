import React, { useEffect } from "react";
import useFetch from "../hooks/useFetch";
import Loading from "./loading";
import Error from "./error";
import { Link } from "react-router-dom";

const PopularTags = () => {
  const [{ response, isLoading, error }, doFetch] = useFetch("tags", {});

  useEffect(() => {
    doFetch();
  }, [doFetch]);

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
          response.tags.map((tag) => (
            <Link to={`tags/${tag}`} className="tag-default tag-pill" key={tag}>
              {tag}
            </Link>
          ))}
      </div>
    </div>
  );
};

export default PopularTags;
