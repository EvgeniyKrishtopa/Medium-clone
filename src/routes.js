import React from "react";
import GlobalFeed from "./pages/globalFeed";
import TagFeed from "./pages/tagFeed";
import YourFeed from "./pages/yourFeed";
import Article from "./pages/article";
import CreateArticle from "./pages/createArticle";
import { Switch, Route } from "react-router-dom";
import Authentication from "./pages/authentication";

export default () => {
  return (
    <Switch>
      <Route path="/" component={GlobalFeed} exact />
      <Route path="/feed" component={YourFeed} />
      <Route path="/articles/new" component={CreateArticle} />
      <Route path="/articles/:slug" component={Article} />
      <Route path="/tags/:slug" component={TagFeed} />
      <Route path="/login" component={Authentication} />
      <Route path="/register" component={Authentication} />
    </Switch>
  );
};
