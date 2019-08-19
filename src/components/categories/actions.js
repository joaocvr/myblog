import { getCategories } from "../../api/API";

export const FETCHED_CATEGORIES = "FETCHED_CATEGORIES";

function fetchedCategories(categories) {
  return { type: FETCHED_CATEGORIES, categories };
}

function fetchingCategories() {
  return dispatch => {
    getCategories().then(categories => {
      dispatch(fetchedCategories(categories));
    });
  };
}

export { fetchingCategories };
