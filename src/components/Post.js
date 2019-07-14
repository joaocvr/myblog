import React, { Component } from "react";
import BackButton from "./BackButton";
import UserActions from "./UserActions";
import { withRouter } from "react-router-dom";
import { getPost, votePost, deletePost } from "../api/API";
import CommentsList from "./CommentsList";

class Post extends Component {
  state = {
    details: {}
  };

  updatePost(postId) {
    getPost(postId).then(details => {
      const { history } = this.props;
      const { categoria } = this.props.match.params;
      const error =
        Object.keys(details).length === 0 ||
        details.error ||
        categoria !== details.category;
      return error ? history.push("/error404") : this.setState({ details });
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
    const { details } = this.state;
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
