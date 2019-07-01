const API_URL = "http://localhost:3001";

let token = localStorage.token;
if (!token)
  token = localStorage.token = Math.random()
    .toString(36)
    .substr(-8);

const HEADER = {
  Accept: "application/json",
  Authorization: token
};

export const getCategories = () =>
  fetch(`${API_URL}/categories`, { headers: HEADER })
    .then(res => res.json())
    .then(data => data.categories);

export const getPostsPerCategories = category =>
  fetch(`${API_URL}/${category}/posts`, { headers: HEADER })
    .then(res => res.json())
    .then(data => data);

export const getAllPosts = () =>
  fetch(`${API_URL}/posts`, { headers: HEADER })
    .then(res => res.json())
    .then(data => data);

export const getPost = id =>
  fetch(`${API_URL}/posts/${id}`, { headers: HEADER })
    .then(res => res.json())
    .then(data => data);

export const getPostComments = postId =>
  fetch(`${API_URL}/posts/${postId}/comments`, { headers: HEADER })
    .then(res => res.json())
    .then(data => data);
