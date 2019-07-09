import React, { Component } from "react";
import UserActions from "./UserActions";

class Comment extends Component {
  render() {
    const { comment, voteAction, deleteAction } = this.props;
    return (
      <div>
        <strong>{comment.body}</strong>
        <UserActions
          id={comment.id}
          voteAction={(vote, id) => voteAction(vote, id)}
          deleteAction={() => deleteAction(comment.id)}
        />
        <br />
        Author: {comment.author} <br />
        Vote score: {comment.voteScore} <br />
      </div>
    );
  }
}

export default Comment;
