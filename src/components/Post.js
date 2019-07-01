import React, { Component } from "react";
import { getPost, getPostComments } from "../api/API";
import Comment from "./Comment";

class Post extends Component {
  state = {
    details: {},
    comments: []
  };

  componentDidMount() {
    const { postId } = this.props.match.params;
    getPost(postId)
      .then(details => {
        this.setState({ details });
      })
      .then(() => {
        getPostComments(postId).then(comments => this.setState({ comments }));
      });
  }

  render() {
    const { details, comments } = this.state;
    return (
      <div>
        <h1>{details.title}</h1>
        <h3>{details.body}</h3>
        <strong>Author: {details.author}</strong> <br />
        {`Comments: ${details.commentCount}, Votes: ${details.voteScore}`}
        <h3>Comments</h3>
        <ul>
          {comments.map(c => {
            return (
              <li key={c.id}>
                <Comment comment={c} />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Post;
