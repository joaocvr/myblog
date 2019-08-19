import React, { Component } from "react";
import { connect } from "react-redux";
import Comment from "./Comment";
import { voteComment, deleteComment } from "../../api/API";
import { fetchingComments } from "./actions";

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

  componentDidMount() {
    const { postId, fetchingComments } = this.props;
    console.log("CommentsList", "componentDidMount", "postId", postId);
    console.log(
      "CommentsList",
      "componentDidMount",
      "fetchingComments",
      fetchingComments
    );
    fetchingComments(postId).then(comments => {
      this.setState({ comments });
    });
  }

  componentDidUpdate(prevProps) {
    const { postId, fetchingComments } = this.props;
    console.log("CommentsList", "componentDidUpdate", "postId", postId);
    console.log(
      "CommentsList",
      "componentDidUpdate",
      "fetchingComments",
      fetchingComments
    );
    if (postId !== prevProps.postId) {
      fetchingComments(postId).then(comments => {
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

const mapDispatchToProps = dispatch => {
  return {
    fetchingComments: async postId => {
      dispatch(fetchingComments(postId));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(CommentsList);
