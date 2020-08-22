import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { CurrentUserContext } from "../contexts/currentUser";

const TopBar = () => {
  const [{ isLoggedIn, currentUser }] = useContext(CurrentUserContext);

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <NavLink to="/" className="navbar-brand">
          Medium
        </NavLink>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <NavLink to="/" className="nav-link" exact>
              Home
            </NavLink>
          </li>

          {isLoggedIn && (
            <>
              <li className="nav-item">
                <NavLink to="/articles/new" className="nav-link">
                  <i className="ion-compose"></i>
                  &nbsp; New Post
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to={`/profiles/${currentUser.username}`}
                  className="nav-link"
                >
                  &nbsp; {currentUser.username}
                </NavLink>
              </li>
            </>
          )}

          {!isLoggedIn && (
            <>
              <li className="nav-item">
                <NavLink to="/login" className="nav-link" exact>
                  Sign in
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/register" className="nav-link" exact>
                  Sign up
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default TopBar;
