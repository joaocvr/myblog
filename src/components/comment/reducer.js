import { VOTED_COMMENT, FETCHED_COMMENTS, DELETED_COMMENT } from "./actions";

export const commentsReducer = (state = [], action) => {
  console.log("commentsReducer", "state", state);
  console.log("commentsReducer", "action", action);
  switch (action.type) {
    case FETCHED_COMMENTS:
      return action.comments;

    case VOTED_COMMENT: {
      const { vote, commentId } = action;
      const voteEffect = vote === "upVote" ? 1 : -1;
      return state.map(c =>
        c.id === commentId ? { ...c, voteScore: c.voteScore + voteEffect } : c
      );
    }

    case DELETED_COMMENT: {
      const { commentId } = action;
      return state.map(
        c => (c = c.id === commentId ? { ...c, deleted: true } : c)
      );
    }

    default:
      return state;
  }
};
