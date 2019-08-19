import React, { Component } from "react";
import PostsList from "./PostsList";
import BackButton from "../utils/BackButton";
import { getPostsPerCategories } from "../../api/API";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class PostsPerCategory extends Component {
  state = {
    posts: []
  };

  componentDidMount() {
    const { category } = this.props.match.params;
    getPostsPerCategories(category).then(posts => {
      const { categories, history } = this.props;
      return !categories.find(c => c.name === category)
        ? history.push("/error404")
        : this.setState({ posts });
    });
  }

  componentDidUpdate(prevProps) {
    const { category } = this.props.match.params;
    if (category !== prevProps.match.params.category) {
      getPostsPerCategories(category).then(posts => this.setState({ posts }));
    }
  }

  render() {
    const { posts } = this.state;
    const { category } = this.props.match.params;
    return (
      <div>
        <h1>{category.toUpperCase()}</h1>
        <PostsList posts={posts} />
        <Link to={{ pathname: "/newPost", state: { category } }}>
          <button>Add a new post</button>
        </Link>
        <BackButton />
      </div>
    );
  }
}

const mapStateToProps = ({ categories }) => {
  return { categories };
};

export default withRouter(connect(mapStateToProps)(PostsPerCategory));
