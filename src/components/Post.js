import React, { Component } from "react";
import BackButton from "./BackButton";
import UserActions from "./UserActions";
import { withRouter } from "react-router-dom";
import { getPost, votePost, deletePost, editPost } from "../api/API";
import CommentsList from "./CommentsList";

class Post extends Component {
  state = {
    details: {},
    isEditable: false
  };

  getPostFields() {
    const { history } = this.props;
    const { details, isEditable } = this.state;

    return (
      <div>
        {!isEditable ? (
          <div>
            <h1>{details.title}</h1>
            <h3>{details.body}</h3>
            <UserActions
              voteAction={vote => this.votePostAction(vote)}
              editAction={() => this.setState({ isEditable: true })}
              deleteAction={() =>
                deletePost(details.id).then(() => history && history.goBack())
              }
            />
          </div>
        ) : (
          <form onSubmit={() => this.submitPostDetails()}>
            <input
              value={details.title}
              name="title"
              onChange={event => this.editPostDetails(event)}
            />
            <br />
            <input
              value={details.body}
              name="body"
              onChange={event => this.editPostDetails(event)}
            />
            <br />
            <button>Save</button>
            <button onClick={() => this.setState({ isEditable: false })}>
              Cancel
            </button>
          </form>
        )}
      </div>
    );
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
    const { details } = this.state;
    const postFields = this.getPostFields();

    return (
      <div>
        {postFields}
        <strong>Author: {details.author}</strong> <br />
        {`Comments: ${details.commentCount}, Votes: ${details.voteScore}`}
        <h3>Comments</h3>
        <CommentsList
          postId={details.id}
          updatePost={() => this.updatePost(details.id)}
        />
        <BackButton />
      </div>
    );
  }
}

export default withRouter(Post);
