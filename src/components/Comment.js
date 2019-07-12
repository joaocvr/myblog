import React, { Component } from "react";
import UserActions from "./UserActions";
import { editComment } from "../api/API";

class Comment extends Component {
  state = {
    isEditable: false
  };

  editAction(isEditable) {
    this.setState({ isEditable });
  }

  editCommentValue(value) {
    console.log("value", value);
  }

  render() {
    const { comment, voteAction, deleteAction } = this.props;
    const { isEditable } = this.state;

    return (
      <div>
        {isEditable ? (
          <div>
            <input
              type="text"
              name="commentBody"
              defaultValue={comment.body}
              onChange={this.editCommentValue.bind(this)}
            />
            <button
              onClick={() => {
                editComment(comment);
                this.editAction(false);
              }}
            >
              Save
            </button>
            <button onClick={() => this.editAction(false)}>Cancel</button>
          </div>
        ) : (
          <strong>{comment.body}</strong>
        )}
        <br />
        <UserActions
          voteAction={vote => voteAction(vote, comment.id)}
          deleteAction={() => deleteAction(comment.id)}
          editAction={() => this.editAction(true)}
        />
        <br />
        Author: {comment.author} <br />
        Vote score: {comment.voteScore} <br />
      </div>
    );
  }
}

export default Comment;
