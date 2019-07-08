import React, { Component } from "react";
import Comment from "./Comment";
import BackButton from "./BackButton";
import UserActions from "./UserActions";
import { getPost, votePost, getPostComments, voteComment } from "../api/API";

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

  votePostState(vote, id) {
    votePost(vote, id).then(() => {
      const { details } = this.state;
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

  voteCommentState(vote, id) {
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

  render() {
    const { details, comments } = this.state;
    const { id } = details;
    return (
      <div>
        <h1>{details.title}</h1>
        <UserActions
          id={id}
          voter={(vote, id) => this.votePostState(vote, id)}
          deleter={id => this.deletePost(id)}
        />
        <h3>{details.body}</h3>
        <strong>Author: {details.author}</strong> <br />
        {`Comments: ${details.commentCount}, Votes: ${details.voteScore}`}
        <h3>Comments</h3>
        <ul>
          {comments &&
            comments.map(c => {
              return (
                <li key={c.id}>
                  <Comment
                    comment={c}
                    voter={(vote, id) => this.voteCommentState(vote, id)}
                    deleter={id => this.delete(id)}
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

export default Post;
