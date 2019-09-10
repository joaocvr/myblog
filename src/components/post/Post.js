import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import BackButton from "../utils/BackButton";
import CommentsList from "../comment/CommentsList";
import NewComment from "../comment/NewComment";
import PostData from "./PostData";
import EditPostForm from "./EditPostForm";
import { deletingPost, editingPost, votingPost, findingPost } from "./actions";

class Post extends Component {
  state = {
    isEditable: false,
    isNewComment: false,
    editedPost: {}
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
    const { editedPost } = this.state;
    const { name, value } = event.target;
    console.log("Post", "editPostDetails", "editedPost", editedPost);
    console.log("Post", "editPostDetails", "name", name);
    console.log("Post", "editPostDetails", "value", value);
    if (name === "body") {
      this.setState({
        ...this.state,
        editedPost: { ...editedPost, body: value }
      });
    } else {
      this.setState({
        ...this.state,
        editedPost: { ...editedPost, title: value }
      });
    }
  }

  submitPostDetails() {
    const { editingPost } = this.props;
    const { editedPost } = this.state;
    editingPost(editedPost).then(() => this.setState({ isEditable: false }));
  }

  votePostAction(vote) {
    const { votingPost, post } = this.props;
    votingPost(vote, post);
  }

  componentDidMount() {
    const { postId, findingPost } = this.props;
    findingPost(postId).then(() => {
      const { post } = this.props;
      this.setState({ ...this.state, editedPost: post });
    });
  }

  componentDidUpdate(prevProps) {
    const { postId, findingPost } = this.props;
    if (postId !== prevProps.postId) {
      findingPost(postId).then(() => {
        const { post } = this.props;
        this.setState({ ...this.state, editedPost: post });
      });
    }
  }

  render() {
    const { history, deletingPost, comments, post } = this.props;
    const { isEditable, isNewComment, editedPost } = this.state;

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
            details={editedPost}
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

const mapStateToProps = ({ comments, allPosts }, { history, match }) => {
  const { postId, category } = match.params;
  return {
    comments,
    history,
    category,
    postId,
    post: allPosts.length > 0 ? allPosts[0] : {}
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deletingPost: postId => dispatch(deletingPost(postId)),
    editingPost: editedPost => dispatch(editingPost(editedPost)),
    votingPost: (vote, post) => dispatch(votingPost(vote, post)),
    findingPost: id => dispatch(findingPost(id))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Post)
);
