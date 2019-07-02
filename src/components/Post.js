import React, { Component } from "react";
import { getPost, getPostComments } from "../api/API";
import Comment from "./Comment";
import UserActions from "./UserActions";

class Post extends Component {
  state = {
    details: {},
    comments: []
  };

  componentDidMount() {
    const { postId } = this.props.match.params;
    this.updatePost(postId);
  }

  updatePost(postId) {
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
    const { history } = this.props;
    const { id } = details;
    return (
      <div>
        <h1>
          {details.title}
          <UserActions postId={id} updatePost={_ => this.updatePost(id)} />
        </h1>
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
        <button onClick={_ => history && history.goBack()}>Back</button>
      </div>
    );
  }
}

export default Post;
