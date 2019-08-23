import React, { Component } from "react";
import BackButton from "../utils/BackButton";
import uuid from "uuid";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { addingNewPost } from "./actions";

class NewPost extends Component {
  state = {
    category: "",
    title: "",
    body: "",
    author: "",
    id: "",
    timestamp: "",
    commentCount: 0,
    voteScore: 0
  };

  submitNewPost(e) {
    e.preventDefault();
    const { title, body, author } = this.state;
    if (title && body && author) {
      const { addingNewPost, history } = this.props;
      addingNewPost({ ...this.state });
      history.push("/");
    } else {
      alert("You need to fullfill all the fields.");
    }
  }

  componentDidMount() {
    const { categories, location } = this.props;
    const firstCategoryName =
      Array.isArray(categories) && categories.length ? categories[0].name : "";
    const category =
      location && location.state ? location.state.category : firstCategoryName;
    this.setState({ category, id: uuid.v4(), timestamp: Date.now() });
  }

  render() {
    const { categories } = this.props;
    const { category, title, body, author } = this.state;

    return (
      <div>
        <h1>New Post</h1>
        <form onSubmit={e => this.submitNewPost(e)}>
          Category:
          <select
            value={category}
            onChange={event => this.setState({ category: event.target.value })}
          >
            {categories &&
              categories.map(cat => <option key={cat.path}>{cat.name}</option>)}
          </select>
          <br />
          Title:
          <input
            placeholder="Title"
            value={title}
            onChange={event => this.setState({ title: event.target.value })}
          />
          <br />
          Body:
          <input
            placeholder="Body"
            value={body}
            onChange={event => this.setState({ body: event.target.value })}
          />
          <br />
          Author:
          <input
            placeholder="Author"
            value={author}
            onChange={event => this.setState({ author: event.target.value })}
          />
          <br />
          <button>Save</button>
          <BackButton />
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ categories }) => {
  return { categories };
};

const mapDispatchToProps = dispatch => {
  return {
    addingNewPost: newPost => {
      dispatch(addingNewPost(newPost));
    }
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(NewPost)
);
