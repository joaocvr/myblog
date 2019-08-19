import { FETCHED_COMMENTS } from "./actions";

export const commentsReducer = (state = [], action) => {
  switch (action.type) {
    case FETCHED_COMMENTS:
      return action.comments;

    default:
      return state;
  }
};
