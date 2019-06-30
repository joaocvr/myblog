import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import PostsPerCategory from "./components/PostsPerCategory";
import Post from "./components/Post";
import NewPost from "./components/NewPost";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/:categoria/:post_id" component={Post} />
        <Route path="/:category" component={PostsPerCategory} />
        <Route path="/newPost" component={NewPost} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
