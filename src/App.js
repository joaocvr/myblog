import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import Home from "./components/Home";
import PostsPerCategory from "./components/PostsPerCategory";
import Post from "./components/post/Post";
import NewPost from "./components/post/NewPost";
import Error404 from "./components/Error404";
import Categories from "./components/categories/index";
import { fetchingCategories } from "./components/categories/actions";
import { fetchingPosts } from "./components/post/actions";

class App extends Component {
  componentDidMount() {
    this.props.fetchingCategories();
    this.props.fetchingPosts();
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Link to={"/"}>Home</Link>
          <Categories />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/newPost" render={props => <NewPost {...props} />} />
            <Route path="/error404" component={Error404} />
            <Route path="/:categoria/:postId" component={Post} />
            <Route
              path="/:category"
              render={props => <PostsPerCategory {...props} />}
            />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    categories: state.categories,
    loading: state.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchingCategories: () => {
      dispatch(fetchingCategories());
    },
    fetchingPosts: () => {
      dispatch(fetchingPosts());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
