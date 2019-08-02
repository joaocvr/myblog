import { getCategories } from "../../api/API";

function fetchedCategories(categories) {
  return { type: "FETCHED_CATEGORIES", categories };
}

function loadingCategories() {
  return { type: "LOADING_CATEGORIES" };
}

function fetchingCategories() {
  return dispatch => {
    dispatch(loadingCategories());
    getCategories().then(categories => {
      dispatch(fetchedCategories(categories));
    });
  };
}

export { fetchingCategories };
