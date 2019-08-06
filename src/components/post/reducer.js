export const postsReducer = (oldState = [], action) => {
  switch (action.type) {
    case "FETCHED_POSTS":
      return action.allPosts;

    case "ADDED_NEW_POST":
      return [...oldState, action.newPost];

    default:
      return oldState;
  }
};
