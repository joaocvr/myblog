import React from "react";
import PostsList from "./PostsList";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Home = ({ posts }) => {
  console.log("Home", "posts", posts);
  return (
    <div>
      <PostsList posts={posts} />
      <Link to={"/newPost"}>
        <button>Add a new post</button>
      </Link>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    posts: state.posts
  };
};

export default connect(
  mapStateToProps,
  null
)(Home);
