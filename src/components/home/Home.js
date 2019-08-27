import React from "react";
import PostsList from "../post/PostsList";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Home = ({ allPosts }) => {
  return (
    <div>
      <PostsList posts={allPosts} />
      <Link to={"/newPost"}>
        <button>Add a new post</button>
      </Link>
    </div>
  );
};

const mapStateToProps = ({ allPosts }) => ({
  allPosts
});

export default connect(mapStateToProps)(Home);
