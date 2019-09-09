import React, { Component } from "react";
import PostsList from "./PostsList";
import BackButton from "../utils/BackButton";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchingPostsPerCategories } from "./actions";
import Error404 from "../error/Error404";

class PostsPerCategory extends Component {
  componentDidUpdate(prevProps) {
    const { category, fetchingPostsPerCategories } = this.props;
    if (category !== prevProps.category) {
      fetchingPostsPerCategories(category);
    }
  }

  componentDidMount() {
    const { category, fetchingPostsPerCategories } = this.props;
    fetchingPostsPerCategories(category);
  }

  render() {
    const { categories, category, allPosts } = this.props;
    return !categories || !categories.find(c => c.name === category) ? (
      <Error404 />
    ) : (
      <div>
        <h1>{category.toUpperCase()}</h1>
        <PostsList posts={allPosts.filter(p => p.category === category)} />
        <Link to={{ pathname: "/newPost", state: { category } }}>
          <button>Add a new post</button>
        </Link>
        <BackButton />
      </div>
    );
  }
}

const mapStateToProps = ({ categories, allPosts }, { match }) => {
  return {
    allPosts,
    categories,
    category: match.params.category
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { fetchingPostsPerCategories }
  )(PostsPerCategory)
);
