import React, { Component } from "react";
import PostsList from "./PostsList";
import { getAllPosts } from "../api/API";
import { Link } from "react-router-dom";

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
        <Link to={"/newPost"}>
          <button>Add a new post</button>
        </Link>
      </div>
    );
  }
}

export default Home;
