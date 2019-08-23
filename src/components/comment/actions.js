import { getPostComments, voteComment, deleteComment } from "../../api/API";

export const FETCHED_COMMENTS = "FETCHED_COMMENTS";
export const VOTED_COMMENT = "VOTED_COMMENT";
export const DELETED_COMMENT = "DELETED_COMMENT";

function votedComment(vote, commentId) {
  return { type: VOTED_COMMENT, vote, commentId };
}

function fetchedComments(comments) {
  return { type: FETCHED_COMMENTS, comments };
}

function deletedComment(commentId) {
  return { type: DELETED_COMMENT, commentId };
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

export { votingComment, fetchingComments, deletingComment };
