import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import BackButton from "../utils/BackButton";
import CommentsList from "../comment/CommentsList";
import NewComment from "../comment/NewComment";
import PostData from "./PostData";
import EditPostForm from "./EditPostForm";
import { deletingPost, editingPost, votingPost } from "./actions";

class Post extends Component {
  state = {
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
    // const { post } = this.props;
    // const { name, value } = event.target;
    // if (name === "body") {
    //   this.setState({ details: { ...details, body: value } });
    // } else {
    //   this.setState({ details: { ...details, title: value } });
    // }
  }

  submitPostDetails() {
    const { editingPost, post } = this.props;
    editingPost(post).then(() => this.setState({ isEditable: false }));
  }

  votePostAction(vote) {
    const { votingPost, post } = this.props;
    votingPost(vote, post);
  }

  componentDidMount() {
    const { category } = this.props.match.params;
    const { post, history } = this.props;
    post === null || category !== post.category
      ? history.push("/error404")
      : this.setState({ ...this.state, details: post });
  }

  render() {
    const { history, deletingPost, comments, post } = this.props;
    const { isEditable, isNewComment } = this.state;

    console.log("Post", "render", "post", post);
    return (
      <div>
        {!isEditable ? (
          <PostData
            details={post}
            voteAction={vote => this.votePostAction(vote)}
            editAction={() => this.toggleEditPost()}
            deleteAction={() =>
              deletingPost(post.id).then(() => history && history.goBack())
            }
          />
        ) : (
          <EditPostForm
            details={post}
            onSubmit={() => this.submitPostDetails()}
            onChange={event => this.editPostDetails(event)}
            onClick={() => this.toggleEditPost()}
          />
        )}
        <strong>Author: {post.author}</strong> <br />
        {`Comments: ${
          comments.filter(c => c.deleted === false).length
        }, Votes: ${post.voteScore}`}
        <h3>Comments</h3>
        {isNewComment ? (
          <NewComment close={() => this.toggleNewComment()} postId={post.id} />
        ) : (
          <button onClick={() => this.toggleNewComment()}>New comment</button>
        )}
        <br />
        <CommentsList postId={post.id} />
        <BackButton />
      </div>
    );
  }
}

const mapStateToProps = (
  { comments, allPosts },
  { history, deletingPost, match }
) => {
  const { postId } = match.params;
  const post = allPosts.find(p => p.id === postId);
  return {
    comments,
    history,
    deletingPost,
    post
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
