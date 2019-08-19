import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import BackButton from "../utils/BackButton";
import { getPost, votePost, editPost } from "../../api/API";
import CommentsList from "../comment/CommentsList";
import NewComment from "../comment/NewComment";
import PostData from "./PostData";
import EditPostForm from "./EditPostForm";
import { deletingPost } from "./actions";

class Post extends Component {
  state = {
    details: {},
    isEditable: false,
    isNewComment: false
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
    const { name } = event.target;
    if (name === "body") {
      this.setState({ details: { ...details, body: event.target.value } });
    } else {
      this.setState({ details: { ...details, title: event.target.value } });
    }
  }

  submitPostDetails() {
    const { details } = this.state;
    editPost(details).then(() => this.setState({ isEditable: false }));
  }

  updatePost(postId) {
    getPost(postId).then(details => {
      const { history } = this.props;
      const { category } = this.props.match.params;
      if (
        Object.keys(details).length === 0 ||
        details.error ||
        category !== details.category
      ) {
        history.push("/error404");
      } else {
        this.setState({ details });
      }
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

  componentDidMount() {
    const { postId } = this.props.match.params;
    this.updatePost(postId);
  }

  render() {
    const { history, deletingPost } = this.props;
    const { details, isEditable, isNewComment } = this.state;

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
        {`Comments: ${details.commentCount}, Votes: ${details.voteScore}`}
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

const mapDispatchToProps = dispatch => {
  return {
    deletingPost: async postId => {
      dispatch(deletingPost(postId));
    }
  };
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(Post)
);
