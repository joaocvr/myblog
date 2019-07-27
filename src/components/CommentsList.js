import React, { Component } from "react";
import Comment from "./comment/Comment";
import { voteComment, deleteComment, getPostComments } from "../api/API";

class CommentsList extends Component {
  state = {
    comments: []
  };

  voteCommentAction(vote, id) {
    voteComment(vote, id).then(() => {
      const { comments } = this.state;
      const voteEffect = vote === "upVote" ? 1 : -1;
      comments.map(c =>
        c.id === id ? (c.voteScore = c.voteScore + voteEffect) : c.voteScore
      );
      this.setState({ comments });
    });
  }

  deleteCommentAction(id) {
    const { comments } = this.state;
    deleteComment(id).then(commentDeleted =>
      this.setState({
        comments: comments.filter(c => c.id !== commentDeleted.id)
      })
    );
  }

  componentDidUpdate(prevProps) {
    const { postId } = this.props;
    if (postId !== prevProps.postId) {
      getPostComments(postId).then(comments => {
        this.setState({ comments });
      });
    }
  }

  render() {
    const { comments } = this.state;
    return (
      <div>
        <ul>
          {comments &&
            comments
              .filter(c => c.deleted === false)
              .map(c => {
                return (
                  <li key={c.id}>
                    <Comment
                      comment={c}
                      voteAction={vote => this.voteCommentAction(vote, c.id)}
                      deleteAction={() => this.deleteCommentAction(c.id)}
                    />
                  </li>
                );
              })}
        </ul>
      </div>
    );
  }
}

export default CommentsList;
