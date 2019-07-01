import React, { Component } from "react";
import PostsList from "./PostsList";
import { getAllPosts } from "../api/API";

class Home extends Component {
  state = {
    allPosts: []
  };

  componentDidMount() {
    getAllPosts().then(allPosts => {
      this.setState({ allPosts });
    });
  }

  render() {
    const { allPosts } = this.state;
    return (
      <div>
        <PostsList posts={allPosts} />
      </div>
    );
  }
}

export default Home;
