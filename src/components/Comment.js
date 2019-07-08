import React, { Component } from "react";
import UserActions from "./UserActions";

class Comment extends Component {
  render() {
    const { comment, voter, deleter } = this.props;
    return (
      <div>
        <strong>{comment.body}</strong>
        <UserActions
          id={comment.id}
          voter={(vote, id) => voter(vote, id)}
          deleter={() => deleter(comment.id)}
        />
        <br />
        Author: {comment.author} <br />
        Vote score: {comment.voteScore} <br />
      </div>
    );
  }
}

export default Comment;
