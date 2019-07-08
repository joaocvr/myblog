import React, { Component } from "react";
import PostsList from "./PostsList";
import { getAllPosts, deletePost } from "../api/API";

class Home extends Component {
  state = {
    allPosts: []
  };

  componentDidMount() {
    getAllPosts().then(allPosts => {
      this.setState({ allPosts });
    });
  }

  deletePost(id) {
    deletePost(id).then(details => this.setState({ details }));
  }

  render() {
    const { allPosts } = this.state;
    return (
      <div>
        <PostsList posts={allPosts} deleter={() => this.deletePost} />
      </div>
    );
  }
}

export default Home;
