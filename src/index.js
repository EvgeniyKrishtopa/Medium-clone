import React from "react";
import ReactDOM from "react-dom";
import Routes from "./routes";
import { BrowserRouter as Router } from "react-router-dom";
import TopBar from "./components/topBar";
import CurrentUserChecker from "./components/currentUserChecker";
import { CurrentUserProvider } from "./contexts/currentUser";

const App = () => {
  return (
    <CurrentUserProvider>
      <CurrentUserChecker>
        <Router basename="/Medium-clone">
          <TopBar />
          <Routes />
        </Router>
      </CurrentUserChecker>
    </CurrentUserProvider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
