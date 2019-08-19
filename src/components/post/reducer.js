import { FETCHED_POSTS, DELETED_POST, ADDED_NEW_POST } from "./actions";

export const postsReducer = (oldState = [], action) => {
  switch (action.type) {
    case FETCHED_POSTS:
      return action.allPosts.sort((postA, postB) =>
        postA.voteScore > postB.voteScore ? 0 : 1
      );

    case DELETED_POST:
      return oldState.filter(p => p.id !== action.postId);

    case ADDED_NEW_POST:
      return [...oldState, action.newPost];

    default:
      return oldState;
  }
};
