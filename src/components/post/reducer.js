export const postsReducer = (oldState = [], action) => {
  switch (action.type) {
    case "FETCHED_POSTS":
      return action.posts;

    default:
      return oldState;
  }
};
