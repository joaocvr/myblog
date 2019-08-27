import { getAllPosts, addNewPost, deletePost } from "../../api/API";

export const FETCHED_POSTS = "FETCHED_POSTS";
export const ADDED_NEW_POST = "ADDED_NEW_POST";
export const DELETED_POST = "DELETED_POST";
export const SORTED_POSTS = "SORTED_POSTS";

function fetchedPosts(allPosts) {
  return { type: FETCHED_POSTS, allPosts };
}

function addedNewPost(newPost) {
  return { type: ADDED_NEW_POST, newPost };
}

function sortedPosts(sortBy) {
  return { type: SORTED_POSTS, sortBy };
}

function deletedPost(postId) {
  return { type: DELETED_POST, postId };
}

const sortingPosts = sortBy => dispatch => {
  dispatch(sortedPosts(sortBy));
};

const fetchingPosts = () => dispatch => {
  getAllPosts().then(allPosts => {
    dispatch(fetchedPosts(allPosts));
  });
};

const addingNewPost = newPost => dispatch => {
  addNewPost(newPost).then(() => {
    dispatch(addedNewPost(newPost));
  });
};

const deletingPost = postId => dispatch => {
  deletePost(postId).then(() => {
    dispatch(deletedPost(postId));
  });
};

export { fetchingPosts, addingNewPost, deletingPost, sortingPosts };
