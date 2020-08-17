import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import Routes from "./routes";
import { BrowserRouter as Router } from "react-router-dom";
import TopBar from "./components/topBar";

const App = () => {
  return (
    <Fragment>
      <Router>
        <TopBar />
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
