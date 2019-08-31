import {
  FETCHED_POSTS,
  DELETED_POST,
  ADDED_NEW_POST,
  SORTED_POSTS,
  EDITED_POST
} from "./actions";

export const postsReducer = (state = [], action) => {
  switch (action.type) {
    case FETCHED_POSTS:
      return action.allPosts;

    case DELETED_POST:
      return state.filter(p => p.id !== action.postId);

    case ADDED_NEW_POST:
      return [...state, action.newPost];

    case SORTED_POSTS: {
      const { sortBy } = action;
      return state
        .slice()
        .sort((postA, postB) => (postA[sortBy] > postB[sortBy] ? 0 : 1));
    }

    case EDITED_POST: {
      const { editedPost } = action;
      return state.map(p => (p.id === editedPost.id ? editedPost : p));
    }

    default:
      return state;
  }
};
