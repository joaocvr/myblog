import React from "react";
import PostsList from "./PostsList";
import BackButton from "../utils/BackButton";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const PostsPerCategory = ({ categories, allPosts, history, category }) => {
  return !categories.find(c => c.name === category) ? (
    <div>{history.push("/error404")}</div>
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
};

const mapStateToProps = ({ categories, allPosts }, { history, match }) => {
  return {
    categories,
    allPosts,
    history,
    category: match.params.category
  };
};

export default withRouter(connect(mapStateToProps)(PostsPerCategory));
