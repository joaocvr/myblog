import React from "react";
import Post from "./Post";

const PostsPerCategory = ({ category }) => {
  return <Post content={`${category.params.id} Example post for category`} />;
};

export default PostsPerCategory;
