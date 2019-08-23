import React, { Component } from "react";
import { connect } from "react-redux";
import Comment from "./Comment";
import { fetchingComments, votingComment, deletingComment } from "./actions";

class CommentsList extends Component {
  componentDidMount() {
    const { postId, fetchingComments } = this.props;
    fetchingComments(postId);
  }

  componentDidUpdate(prevProps) {
    const { postId, fetchingComments } = this.props;
    if (postId !== prevProps.postId) {
      fetchingComments(postId);
    }
  }

  render() {
    const { comments, votingComment, deletingComment } = this.props;
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
                      voteAction={vote => votingComment(vote, c.id)}
                      deleteAction={() => deletingComment(c.id)}
                    />
                  </li>
                );
              })}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = ({ comments }) => {
  return { comments };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchingComments: async postId => {
      dispatch(fetchingComments(postId));
    },
    votingComment: (vote, commentId) => {
      dispatch(votingComment(vote, commentId));
    },
    deletingComment: commentId => {
      dispatch(deletingComment(commentId));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentsList);
