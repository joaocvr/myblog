import { getAllPosts, addNewPost, deletePost } from "../../api/API";

export const FETCHED_POSTS = "FETCHED_POSTS";
export const ADDED_NEW_POST = "ADDED_NEW_POST";
export const DELETED_POST = "DELETED_POST";

function fetchedPosts(allPosts) {
  return { type: FETCHED_POSTS, allPosts };
}

function fetchingPosts() {
  return dispatch => {
    getAllPosts().then(allPosts => {
      dispatch(fetchedPosts(allPosts));
    });
  };
}

function addedNewPost(newPost) {
  return { type: ADDED_NEW_POST, newPost };
}

function addingNewPost(newPost) {
  return dispatch => {
    addNewPost(newPost).then(() => {
      dispatch(addedNewPost(newPost));
    });
  };
}

function deletingPost(postId) {
  return dispatch => {
    deletePost(postId).then(() => {
      dispatch(deletedPost(postId));
    });
  };
}

function deletedPost(postId) {
  return { type: DELETED_POST, postId };
}

export { fetchingPosts, addingNewPost, deletingPost };
