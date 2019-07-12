import React, { Component } from "react";
import Comment from "./Comment";
import { voteComment, deleteComment, getPostComments } from "../api/API";

class CommentsList extends Component {
  state = {
    comments: []
  };

  componentDidMount() {
    const { postId } = this.props;
    getPostComments(postId).then(comments => this.setState({ comments }));
  }

  voteCommentAction(vote, id) {
    voteComment(vote, id).then(() => {
      const { comments } = this.state;
      if (vote === "upVote") {
        comments.map(c =>
          c.id === id ? (c.voteScore = c.voteScore + 1) : c.voteScore
        );
      } else {
        comments.map(c =>
          c.id === id ? (c.voteScore = c.voteScore - 1) : c.voteScore
        );
      }
      this.setState({ comments });
    });
  }

  deleteCommentAction(id) {
    const { comments } = this.state;
    const { updatePost } = this.props;
    deleteComment(id)
      .then(commentDeleted =>
        this.setState({
          comments: comments.filter(c => c.id !== commentDeleted.id)
        })
      )
      .then(updatePost);
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
