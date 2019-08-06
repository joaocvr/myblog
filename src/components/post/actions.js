import { getAllPosts, addNewPost } from "../../api/API";

function fetchedPosts(allPosts) {
  return { type: "FETCHED_POSTS", allPosts };
}

function fetchingPosts() {
  return dispatch => {
    getAllPosts().then(allPosts => {
      dispatch(fetchedPosts(allPosts));
    });
  };
}

function addedNewPost(newPost) {
  return { type: "ADDED_NEW_POST", newPost };
}

function addingNewPost(newPost) {
  return dispatch => {
    addNewPost(newPost).then(() => {
      dispatch(addedNewPost(newPost));
    });
  };
}

export { fetchingPosts, addingNewPost };
