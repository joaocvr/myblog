import {
  VOTED_COMMENT,
  FETCHED_COMMENTS,
  DELETED_COMMENT,
  ADDED_COMMENT
} from "./actions";

export const commentsReducer = (state = [], action) => {
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

    case ADDED_COMMENT: {
      return [...state, action.newComment];
    }

    default:
      return state;
  }
};
