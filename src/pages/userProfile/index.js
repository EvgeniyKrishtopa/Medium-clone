import React, { useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { NavLink } from "react-router-dom";
import UserArticles from "./components/userArticles";

const UserProfile = ({ location, match }) => {
  const slug = match.params.slug;
  const isFavorites = location.pathname.includes("favorites");
  const apiUrl = `profiles/${slug}`;
  const [{ response }, doFetch] = useFetch(apiUrl, {});

  useEffect(() => {
    doFetch();
  }, [doFetch, slug]);

  return (
    <>
      {response && (
        <div className="profile-page">
          <div className="user-info">
            <div className="container">
              <div className="row">
                <div className="col-xs-12 col-md-10 offset-md-1">
                  <h4>{response.profile.username}</h4>
                  <p>{response.profile.bio}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-10 offset-md-1">
                <div className="articles-toggle">
                  <ul className="nav nav-pills outline-active">
                    <li className="nav-item">
                      <NavLink
                        to={`/profiles/${response.profile.username}`}
                        className="nav-link"
                        exact
                      >
                        {`${response.profile.username}'s posts`}
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink
                        to={`/profiles/${response.profile.username}/favorites`}
                        className="nav-link"
                      >
                        {`${response.profile.username}'s favorites Posts`}
                      </NavLink>
                    </li>
                  </ul>
                </div>
                <UserArticles
                  username={response.profile.username}
                  location={location}
                  isFavorites={isFavorites}
                  url={match.url}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserProfile;
