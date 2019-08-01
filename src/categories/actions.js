import { getCategories } from "../api/API";

function fetchedCategories(categories) {
  return { type: "FETCHED_CATEGORIES", categories };
}

function loadingCategories() {
  return { type: "LOADING_CATEGORIES" };
}

function fetchingCategories(categories) {
  return dispatch => {
    console.log("actions.js", "fetchingCategories", "categories", categories);
    dispatch(loadingCategories());
    getCategories().then(categories => {
      console.log(
        "actions.js",
        "fetchingCategories",
        "before dispatch fetchedCategories"
      );
      dispatch(fetchedCategories(categories));
      console.log(
        "actions.js",
        "fetchingCategories",
        "after dispatch fetchedCategories"
      );
    });
  };
}

export { fetchingCategories };
