import React, { Component } from "react";
import PostsList from "../post/PostsList";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchingPosts } from "../post/actions";

class Home extends Component {
  componentDidMount() {
    const { fetchingPosts } = this.props;
    fetchingPosts();
  }

  render() {
    const { allPosts } = this.props;
    return (
      <div>
        <PostsList posts={allPosts} />
        <Link to={"/newPost"}>
          <button>Add a new post</button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = ({ allPosts }) => ({
  allPosts
});

export default connect(
  mapStateToProps,
  { fetchingPosts }
)(Home);
