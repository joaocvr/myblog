const API_URL = "http://localhost:3001";

let token = localStorage.token;
if (!token)
  token = localStorage.token = Math.random()
    .toString(36)
    .substr(-8);

const headers = {
  Accept: "application/json",
  Authorization: token
};

export const getCategories = () =>
  fetch(`${API_URL}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories);

export const getPostsPerCategories = category =>
  fetch(`${API_URL}/${category}/posts`, { headers })
    .then(res => res.json())
    .then(data => data);

export const getAllPosts = () =>
  fetch(`${API_URL}/posts`, { headers })
    .then(res => res.json())
    .then(data => data);

export const getPost = id =>
  fetch(`${API_URL}/posts/${id}`, { headers })
    .then(res => res.json())
    .then(data => data);

export const getPostComments = postId =>
  fetch(`${API_URL}/posts/${postId}/comments`, { headers })
    .then(res => res.json())
    .then(data => data);

export const votePost = (vote, postId) =>
  fetch(`${API_URL}/posts/${postId}`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ option: vote })
  })
    .then(res => res.json())
    .then(data => data);

export const voteComment = (vote, commentId) =>
  fetch(`${API_URL}/comments/${commentId}`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ option: vote })
  })
    .then(res => res.json())
    .then(data => data);

export const deletePost = id =>
  fetch(`${API_URL}/posts/${id}`, {
    method: "DELETE",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(data => data);

export const deleteComment = id =>
  fetch(`${API_URL}/comments/${id}`, {
    method: "DELETE",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(data => data);

export const editComment = async comment => {
  fetch(`${API_URL}/comments/${comment.id}`, {
    method: "PUT",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ ...comment })
  })
    .then(res => res.json())
    .then(data => data);
};

export const editPost = async post => {
  fetch(`${API_URL}/posts/${post.id}`, {
    method: "PUT",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(post)
  })
    .then(res => res.json())
    .then(data => data);
};

export const addNewPost = async newPost => {
  fetch(`${API_URL}/posts`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newPost)
  })
    .then(res => res.json())
    .then(data => data);
};

export const addNewComment = async comment => {
  fetch(`${API_URL}/comments`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(comment)
  })
    .then(res => res.json())
    .then(data => data);
};
