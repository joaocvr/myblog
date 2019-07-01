import React, { Component } from "react";
import PostsList from "./PostsList";
import { getPostsPerCategories } from "../api/API";

class PostsPerCategory extends Component {
  state = {
    category: "",
    posts: []
  };

  componentDidMount() {
    const { category } = this.props.match.params;
    getPostsPerCategories(category).then(posts =>
      this.setState({ category, posts })
    );
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
      </div>
    );
  }
}

export default PostsPerCategory;
