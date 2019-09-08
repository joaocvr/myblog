import React from "react";
import { render } from "react-dom";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { categoriesReducer } from "./components/categories/reducer";
import { postsReducer } from "./components/post/reducer";
import { commentsReducer } from "./components/comment/reducer";
import { fetchingPosts } from "./components/post/actions";
import { fetchingCategories } from "./components/categories/actions";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers({
    categories: categoriesReducer,
    allPosts: postsReducer,
    comments: commentsReducer
  }),
  composeEnhancers(applyMiddleware(thunk))
);

store.dispatch(fetchingCategories());
store.dispatch(fetchingPosts());

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
