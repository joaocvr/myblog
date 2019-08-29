import React, { Component } from "react";
import UserActions from "../utils/UserActions";
import { editComment } from "../../api/API";

class Comment extends Component {
  state = {
    commentBodyState: "",
    isEditable: false
  };

  editAction(isEditable) {
    if (isEditable) {
      this.setState({ isEditable });
    } else {
      this.loadCommentsDataFromProps();
      this.setState({ isEditable });
    }
  }

  editCommentValue(event) {
    const { value } = event.target;
    this.setState({ commentBodyState: value });
  }

  loadCommentsDataFromProps() {
    const { comment } = this.props;
    this.setState({ commentBodyState: comment.body });
  }

  submitEdit(e) {
    e.preventDefault();
    const { comment } = this.props;
    const { commentBodyState } = this.state;
    editComment({ ...comment, body: commentBodyState }).then(() =>
      this.setState({ commentBodyState, isEditable: false })
    );
  }

  componentDidMount() {
    this.loadCommentsDataFromProps();
  }

  render() {
    const { comment, voteAction, deleteAction } = this.props;
    const { commentBodyState, isEditable } = this.state;
    return (
      <div>
        {isEditable ? (
          <div>
            <form onSubmit={e => this.submitEdit(e)}>
              <input
                type="text"
                value={commentBodyState}
                onChange={event => this.editCommentValue(event)}
              />
              <button>Save</button>
              <button onClick={() => this.editAction(false)}>Cancel</button>
            </form>
          </div>
        ) : (
          <div>
            <strong>{commentBodyState}</strong>
            <UserActions
              voteAction={vote => voteAction(vote, comment.id)}
              deleteAction={() => deleteAction(comment.id)}
              editAction={() => this.editAction(true)}
            />
          </div>
        )}
        <br />
        Author: {comment.author} <br />
        Vote score: {comment.voteScore} <br />
      </div>
    );
  }
}

export default Comment;
