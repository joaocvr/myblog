import { getCategories } from "../../api/API";

export const FETCHED_CATEGORIES = "FETCHED_CATEGORIES";

const fetchedCategories = categories => ({
  type: FETCHED_CATEGORIES,
  categories
});

const fetchingCategories = () => dispatch =>
  getCategories().then(categories => {
    dispatch(fetchedCategories(categories));
  });

export { fetchingCategories };
