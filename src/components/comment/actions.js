import { getPostComments } from "../../api/API";

export const FETCHED_COMMENTS = "FETCHED_COMMENTS";

function fetchedComments(comments) {
  return { type: FETCHED_COMMENTS, comments };
}

function fetchingComments(postId) {
  return dispatch => {
    getPostComments(postId).then(comments => {
      dispatch(fetchedComments(comments));
    });
  };
}

export { fetchingComments };
