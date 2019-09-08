import {
  getAllPosts,
  addNewPost,
  deletePost,
  editPost,
  votePost
} from "../../api/API";

export const FETCHED_POSTS = "FETCHED_POSTS";
export const ADDED_NEW_POST = "ADDED_NEW_POST";
export const DELETED_POST = "DELETED_POST";
export const SORTED_POSTS = "SORTED_POSTS";
export const EDITED_POST = "EDITED_POST";

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

function editedPost(editedPost) {
  return { type: EDITED_POST, editedPost };
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

const editingPost = postEdited => dispatch => {
  editPost(postEdited).then(() => {
    dispatch(editedPost(postEdited));
  });
};

const votingPost = (vote, post) => dispatch => {
  const { id } = post;
  votePost(vote, id).then(() => {
    if (vote === "upVote") {
      dispatch(editedPost({ ...post, voteScore: post.voteScore + 1 }));
    } else {
      dispatch(editedPost({ ...post, voteScore: post.voteScore - 1 }));
    }
  });
};

export {
  fetchingPosts,
  addingNewPost,
  deletingPost,
  sortingPosts,
  editingPost,
  votingPost
};
