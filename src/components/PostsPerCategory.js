import React, { Component } from "react";
import PostsList from "./PostsList";
import BackButton from "./BackButton";
import { getPostsPerCategories } from "../api/API";
import { withRouter } from "react-router";

class PostsPerCategory extends Component {
  state = {
    category: "",
    posts: []
  };

  componentDidMount() {
    const { category } = this.props.match.params;
    getPostsPerCategories(category).then(posts => {
      const { categories, history } = this.props;
      return !categories.find(c => c.name === category)
        ? history.push("/error404")
        : this.setState({ category, posts });
    });
  }

  componentDidUpdate(prevProps) {
    const { category } = this.props.match.params;
    if (category !== prevProps.match.params.category) {
      getPostsPerCategories(category).then(posts =>
        this.setState({ category, posts })
      );
    }
  }

  render() {
    const { category, posts } = this.state;
    return (
      <div>
        <h1>{category.toUpperCase()}</h1>
        <PostsList posts={posts} />
        <BackButton />
      </div>
    );
  }
}

export default withRouter(PostsPerCategory);
