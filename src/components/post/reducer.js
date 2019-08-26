import {
  FETCHED_POSTS,
  DELETED_POST,
  ADDED_NEW_POST,
  SORTED_POSTS
} from "./actions";

export const postsReducer = (state = [], action) => {
  console.log("postsReducer", "state", state);
  console.log("postsReducer", "action", action);
  switch (action.type) {
    case FETCHED_POSTS:
      return action.allPosts;

    case DELETED_POST:
      return state.filter(p => p.id !== action.postId);

    case ADDED_NEW_POST:
      return [...state, action.newPost];

    case SORTED_POSTS: {
      const { sortBy } = action;
      console.log("postsReducer", "SORTED_POSTS");
      return state.sort((postA, postB) =>
        postA[sortBy] > postB[sortBy] ? 0 : 1
      );
    }

    default:
      return state;
  }
};
