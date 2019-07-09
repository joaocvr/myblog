import React, { Component } from "react";
import Comment from "./Comment";
import BackButton from "./BackButton";
import UserActions from "./UserActions";
import { withRouter } from "react-router-dom";
import {
  getPost,
  votePost,
  getPostComments,
  voteComment,
  deletePost,
  deleteComment
} from "../api/API";

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

  votePostAction(vote) {
    const { details } = this.state;
    const { id } = details;
    votePost(vote, id).then(() => {
      if (vote === "upVote") {
        this.setState({
          details: { ...details, voteScore: details.voteScore + 1 }
        });
      } else {
        this.setState({
          details: { ...details, voteScore: details.voteScore - 1 }
        });
      }
    });
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
    deleteComment(id).then(commentDeleted =>
      this.setState({
        comments: comments.filter(c => c.id !== commentDeleted.id)
      })
    );
  }

  render() {
    const { history } = this.props;
    const { details, comments } = this.state;
    return (
      <div>
        <h1>{details.title}</h1>
        <UserActions
          voteAction={vote => this.votePostAction(vote)}
          deleteAction={() =>
            deletePost(details.id).then(() => history && history.goBack())
          }
        />
        <h3>{details.body}</h3>
        <strong>Author: {details.author}</strong> <br />
        {`Comments: ${details.commentCount}, Votes: ${details.voteScore}`}
        <h3>Comments</h3>
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
        <BackButton />
      </div>
    );
  }
}

export default withRouter(Post);
