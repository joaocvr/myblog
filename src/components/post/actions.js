import {
  getAllPosts,
  addNewPost,
  deletePost,
  editPost,
  votePost,
  getPostsPerCategories,
  getPost
} from "../../api/API";

export const FETCHED_POSTS = "FETCHED_POSTS";
export const ADDED_NEW_POST = "ADDED_NEW_POST";
export const DELETED_POST = "DELETED_POST";
export const SORTED_POSTS = "SORTED_POSTS";
export const EDITED_POST = "EDITED_POST";
export const FETCHED_POSTS_PER_CATEGORY = "FETCHED_POSTS_PER_CATEGORY";
export const FOUND_POST = "FOUND_POST";

const fetchedPosts = allPosts => ({ type: FETCHED_POSTS, allPosts });

const addedNewPost = newPost => ({ type: ADDED_NEW_POST, newPost });
const sortedPosts = sortBy => ({ type: SORTED_POSTS, sortBy });
const deletedPost = postId => ({ type: DELETED_POST, postId });
const editedPost = editedPost => ({ type: EDITED_POST, editedPost });
const fetchedPostsPerCategory = posts => ({
  type: FETCHED_POSTS_PER_CATEGORY,
  payload: posts
});
const findedPost = post => ({ type: FOUND_POST, payload: post });

const sortingPosts = sortBy => dispatch => dispatch(sortedPosts(sortBy));

const fetchingPosts = () => dispatch =>
  getAllPosts().then(allPosts => {
    dispatch(fetchedPosts(allPosts));
  });

const addingNewPost = newPost => dispatch =>
  addNewPost(newPost).then(() => {
    dispatch(addedNewPost(newPost));
  });

const deletingPost = postId => dispatch =>
  deletePost(postId).then(() => {
    dispatch(deletedPost(postId));
  });

const editingPost = postEdited => dispatch =>
  editPost(postEdited).then(() => {
    dispatch(editedPost(postEdited));
  });

const votingPost = (vote, post) => dispatch => {
  const { id } = post;
  return votePost(vote, id).then(() => {
    if (vote === "upVote") {
      dispatch(editedPost({ ...post, voteScore: post.voteScore + 1 }));
    } else {
      dispatch(editedPost({ ...post, voteScore: post.voteScore - 1 }));
    }
  });
};

const fetchingPostsPerCategories = category => dispatch =>
  getPostsPerCategories(category).then(posts => {
    dispatch(fetchedPostsPerCategory(posts));
  });

const findingPost = id => dispatch =>
  getPost(id).then(post => {
    dispatch(findedPost(post));
  });

export {
  fetchingPosts,
  addingNewPost,
  deletingPost,
  sortingPosts,
  editingPost,
  votingPost,
  fetchingPostsPerCategories,
  findingPost
};
