import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import PostsPerCategory from "./components/PostsPerCategory";
import PostDetail from "./components/PostDetail";
import NewPost from "./components/NewPost";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/category" component={PostsPerCategory} />
        <Route path="/category/detail" component={PostDetail} />
        <Route path="/newPost" component={NewPost} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
