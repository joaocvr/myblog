import React from "react";

const Comment = ({ comment }) => {
  return (
    <div>
      author: {comment.author} <br />
      body: {comment.body} <br />
      deleted: {comment.deleted ? "yes" : "no"} <br />
      id: {comment.id} <br />
      parentDeleted: {comment.parentDeleted ? "yes" : "no"} <br />
      parentId: {comment.parentId} <br />
      timestamp: {comment.timestamp} <br />
      voteScore: {comment.voteScore} <br />
    </div>
  );
};

export default Comment;
