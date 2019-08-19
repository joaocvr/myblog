import { FETCHED_CATEGORIES } from "./actions";

export const categoriesReducer = (oldState = [], action) => {
  switch (action.type) {
    case FETCHED_CATEGORIES:
      return action.categories;

    default:
      return oldState;
  }
};
