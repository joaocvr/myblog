import React, { Component } from "react";
import BackButton from "../BackButton";
import { withRouter } from "react-router-dom";
import { getPost, votePost, deletePost, editPost } from "../../api/API";
import CommentsList from "../CommentsList";
import NewComment from "../NewComment";
import PostData from "./PostData";
import EditPostForm from "./EditPostForm";

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
      const { categoria } = this.props.match.params;
      if (
        Object.keys(details).length === 0 ||
        details.error ||
        categoria !== details.category
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
    const { history } = this.props;
    const { details, isEditable, isNewComment } = this.state;

    return (
      <div>
        {!isEditable ? (
          <PostData
            details={details}
            voteAction={vote => this.votePostAction(vote)}
            editAction={() => this.toggleEditPost()}
            deleteAction={() =>
              deletePost(details.id).then(() => history && history.goBack())
            }
          />
        ) : (
          <EditPostForm
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

export default withRouter(Post);
