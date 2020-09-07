import React, { useContext, useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import useLocalStorage from "../../hooks/useLocalStorage";
import { CurrentUserContext } from "../../contexts/currentUser";
import BackendErrorMessages from "../../components/backendErrorMessages";
import { Redirect } from "react-router-dom";

const SettingsPage = () => {
  const apiUrl = "user";
  const [currentUserState, dispatch] = useContext(CurrentUserContext);
  const [{ response, error }, doFetch] = useFetch(apiUrl, {});
  const [, setToken] = useLocalStorage("token");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSuccessFullLogOut, setIsSuccessFullLogOut] = useState(false);

  useEffect(() => {
    if (!currentUserState.currentUser) {
      return;
    }

    setBio(currentUserState.currentUser.bio);
    setEmail(currentUserState.currentUser.email);
    setUsername(currentUserState.currentUser.username);
  }, [currentUserState.currentUser]);

  useEffect(() => {
    if (!response) {
      return;
    }

    dispatch({
      type: "SET_AUTHORIZED",
      payload: response.user,
    });
  }, [response, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    doFetch({
      method: "put",
      data: {
        user: {
          ...currentUserState.currentUser,
          username,
          bio,
          email,
          password,
        },
      },
    });
  };

  const logOut = (e) => {
    e.preventDefault();

    setToken("");

    dispatch({
      type: "LOGOUT",
    });

    setIsSuccessFullLogOut(true);
  };

  if (isSuccessFullLogOut) {
    return <Redirect to="/" />;
  }

  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Your Settings</h1>
            {error && <BackendErrorMessages backendError={error.errors} />}
            <form onSubmit={handleSubmit}>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <textarea
                    className="form-control form-control-lg"
                    rows="9"
                    placeholder="Short bio"
                    value={bio || "bio"}
                    onChange={(e) => setBio(e.target.value)}
                  ></textarea>
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </fieldset>
                <button
                  type="submit"
                  className="btn btn-lg btn-primary pull-xs-right"
                >
                  Update Settings
                </button>
              </fieldset>
            </form>
            <hr />
            <button className="btn btn-outline-danger" onClick={logOut}>
              Or click here to logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
