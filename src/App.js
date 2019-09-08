import React from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import Home from "./components/home/Home";
import PostsPerCategory from "./components/post/PostsPerCategory";
import Post from "./components/post/Post";
import NewPost from "./components/post/NewPost";
import Error404 from "./components/error/Error404";
import Categories from "./components/categories/index";
import { fetchingCategories } from "./components/categories/actions";
import { fetchingPosts } from "./components/post/actions";

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Link to={"/"}>Home</Link>
        <Categories />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/newPost" render={props => <NewPost {...props} />} />
          <Route path="/error404" component={Error404} />
          <Route path="/:category/:postId" component={Post} />
          <Route
            path="/:category"
            render={props => <PostsPerCategory {...props} />}
          />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default connect(
  null,
  { fetchingCategories, fetchingPosts }
)(App);
