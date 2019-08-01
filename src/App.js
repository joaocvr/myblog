import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import Home from "./components/Home";
import PostsPerCategory from "./components/PostsPerCategory";
import Post from "./components/post/Post";
import NewPost from "./components/NewPost";
import Error404 from "./components/Error404";
import Categories from "./categories/index";
import { fetchingCategories } from "./categories/actions";

class App extends Component {
  componentDidMount() {
    this.props.fetchingCategories();
  }

  render() {
    const { categories } = this.props;
    console.log("App", "render", "categories", categories);
    return (
      <BrowserRouter>
        <div>
          <Link to={"/"}>Home</Link>
          <Categories categories={categories} />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route
              path="/newPost"
              render={props => <NewPost {...props} categories={categories} />}
            />
            <Route path="/error404" component={Error404} />
            <Route path="/:categoria/:postId" component={Post} />
            <Route
              path="/:category"
              render={props => (
                <PostsPerCategory {...props} categories={categories} />
              )}
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
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
