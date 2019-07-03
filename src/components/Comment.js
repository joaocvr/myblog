import React, { Component } from "react";
import UserActions from "./UserActions";
import { voteComment } from "../api/API";

class Comment extends Component {
  render() {
    const { comment, updatePost } = this.props;
    return (
      <div>
        <strong>{comment.body}</strong>
        <UserActions
          id={comment.id}
          voteFunction={(vote, id) => voteComment(vote, id)}
          update={_ => updatePost(comment.parentId)}
        />
        <br />
        Author: {comment.author} <br />
        Vote score: {comment.voteScore} <br />
      </div>
    );
  }
}

export default Comment;
