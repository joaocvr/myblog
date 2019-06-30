import React, { Component } from "react";
import "./Home.css";
import PostsList from "../PostsList";
import { Link } from "react-router-dom";
import { getCategories, getAllPosts } from "../../api/API";

class Home extends Component {
  state = {
    categories: [],
    allPosts: []
  };

  componentDidMount() {
    getCategories().then(categories => {
      this.setState(categories);
    });
    getAllPosts().then(allPosts => {
      this.setState({ allPosts });
    });
  }

  render() {
    const { categories, allPosts } = this.state;
    return (
      <div>
        <div className="Menu">
          <ul>
            {categories &&
              categories.map(cat => (
                <Link to={`${cat.path}`} key={cat.path}>
                  <li>{cat.name}</li>
                </Link>
              ))}
          </ul>
        </div>

        <PostsList posts={allPosts} />
      </div>
    );
  }
}

export default Home;
