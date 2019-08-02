export const categoriesReducer = (oldState = [], action) => {
  switch (action.type) {
    case "FETCHED_CATEGORIES":
      return action.categories;

    default:
      return oldState;
  }
};

export const loadingReducer = (oldState = "false", action) => {
  switch (action.type) {
    case "FETCHED_CATEGORIES":
      return false;

    case "LOADING_CATEGORIES":
      return true;

    default:
      return oldState;
  }
};
