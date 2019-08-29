import {
  getPostComments,
  voteComment,
  deleteComment,
  addNewComment
} from "../../api/API";

export const FETCHED_COMMENTS = "FETCHED_COMMENTS";
export const VOTED_COMMENT = "VOTED_COMMENT";
export const DELETED_COMMENT = "DELETED_COMMENT";
export const ADDED_COMMENT = "ADDED_COMMENT";

function votedComment(vote, commentId) {
  return { type: VOTED_COMMENT, vote, commentId };
}

function fetchedComments(comments) {
  return { type: FETCHED_COMMENTS, comments };
}

function deletedComment(commentId) {
  return { type: DELETED_COMMENT, commentId };
}

function addedComment(newComment) {
  return { type: ADDED_COMMENT, newComment };
}

function votingComment(vote, commentId) {
  return dispatch => {
    voteComment(vote, commentId).then(() => {
      dispatch(votedComment(vote, commentId));
    });
  };
}

function fetchingComments(postId) {
  return dispatch => {
    getPostComments(postId).then(comments => {
      dispatch(fetchedComments(comments));
    });
  };
}

function deletingComment(commentId) {
  return dispatch => {
    deleteComment(commentId).then(({ id }) => {
      dispatch(deletedComment(id));
    });
  };
}

function addingNewComment(newComment) {
  return dispatch => {
    addNewComment(newComment).then(() => {
      dispatch(addedComment(newComment));
    });
  };
}

export { votingComment, fetchingComments, deletingComment, addingNewComment };
