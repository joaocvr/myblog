import { getAllPosts } from "../../api/API";

function fetchedPosts(posts) {
  return { type: "FETCHED_POSTS", posts };
}

function fetchingPosts() {
  return dispatch => {
    getAllPosts().then(posts => {
      dispatch(fetchedPosts(posts));
    });
  };
}

export { fetchingPosts };
