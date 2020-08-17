import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import Routes from "./routes";
import { BrowserRouter as Router } from "react-router-dom";

const App = () => {
  return (
    <Fragment>
      <h3>Welcome to my app</h3>
      <Router>
        <Routes />
      </Router>
    </Fragment>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
