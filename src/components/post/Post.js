import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import BackButton from "../utils/BackButton";
import CommentsList from "../comment/CommentsList";
import NewComment from "../comment/NewComment";
import PostData from "./PostData";
import EditPostForm from "./EditPostForm";
import { deletingPost, editingPost, votingPost } from "./actions";
import { getPost } from "../../api/API";

class Post extends Component {
  state = {
    isEditable: false,
    isNewComment: false,
    details: {}
  };

  toggleNewComment() {
    const { isNewComment } = this.state;
    this.setState({ isNewComment: !isNewComment });
  }

  toggleEditPost() {
    const { isEditable } = this.state;
    this.setState({ isEditable: !isEditable });
  }

  editPostDetails(event) {
    const { details } = this.state;
    const { name, value } = event.target;
    if (name === "body") {
      this.setState({ ...this.state, details: { ...details, body: value } });
    } else {
      this.setState({ ...this.state, details: { ...details, title: value } });
    }
  }

  submitPostDetails() {
    const { editingPost } = this.props;
    const { details } = this.state;
    editingPost(details).then(() => this.setState({ isEditable: false }));
  }

  votePostAction(vote) {
    const { votingPost } = this.props;
    const { details } = this.state;
    votingPost(vote, { ...details }).then(() => {
      vote === "upVote"
        ? this.setState({
            ...this.state,
            details: { ...details, voteScore: details.voteScore + 1 }
          })
        : this.setState({
            ...this.state,
            details: { ...details, voteScore: details.voteScore - 1 }
          });
    });
  }

  componentDidMount() {
    const { category, postId, history } = this.props;

    if (category && postId) {
      getPost(postId).then(post => {
        post && post.category === category
          ? this.setState({ ...this.state, details: { ...post } })
          : history.push("/error404");
      });
    } else {
      history.push("/error404");
    }
  }

  render() {
    const { history, deletingPost, comments } = this.props;
    const { isEditable, isNewComment } = this.state;
    const { details } = this.state;

    return (
      <div>
        {!isEditable ? (
          <PostData
            details={details}
            voteAction={vote => this.votePostAction(vote)}
            editAction={() => this.toggleEditPost()}
            deleteAction={() =>
              deletingPost(details.id).then(() => history && history.goBack())
            }
          />
        ) : (
          <EditPostForm
            details={details}
            onSubmit={() => this.submitPostDetails()}
            onChange={event => this.editPostDetails(event)}
            onClick={() => this.toggleEditPost()}
          />
        )}
        <strong>Author: {details.author}</strong> <br />
        {`Comments: ${
          comments.filter(c => c.deleted === false).length
        }, Votes: ${details.voteScore}`}
        <h3>Comments</h3>
        {isNewComment ? (
          <NewComment
            close={() => this.toggleNewComment()}
            postId={details.id}
          />
        ) : (
          <button onClick={() => this.toggleNewComment()}>New comment</button>
        )}
        <br />
        <CommentsList postId={details.id} />
        <BackButton />
      </div>
    );
  }
}

const mapStateToProps = ({ comments }, { history, match }) => {
  const { postId, category } = match.params;
  return {
    comments,
    history,
    category,
    postId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deletingPost: async postId => {
      dispatch(deletingPost(postId));
    },
    editingPost: async editedPost => {
      dispatch(editingPost(editedPost));
    },
    votingPost: async (vote, post) => {
      dispatch(votingPost(vote, post));
    }
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Post)
);
