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

const votedComment = (vote, commentId) => ({
  type: VOTED_COMMENT,
  vote,
  commentId
});
const fetchedComments = comments => ({ type: FETCHED_COMMENTS, comments });
const deletedComment = commentId => ({ type: DELETED_COMMENT, commentId });
const addedComment = newComment => ({ type: ADDED_COMMENT, newComment });

const votingComment = (vote, commentId) => dispatch =>
  voteComment(vote, commentId).then(() => {
    dispatch(votedComment(vote, commentId));
  });

const fetchingComments = postId => dispatch =>
  getPostComments(postId).then(comments => {
    dispatch(fetchedComments(comments));
  });

const deletingComment = commentId => dispatch =>
  deleteComment(commentId).then(({ id }) => {
    dispatch(deletedComment(id));
  });

const addingNewComment = newComment => dispatch =>
  addNewComment(newComment).then(() => {
    dispatch(addedComment(newComment));
  });

export { votingComment, fetchingComments, deletingComment, addingNewComment };
