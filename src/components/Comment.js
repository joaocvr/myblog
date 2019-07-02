import React from "react";

const Comment = ({ comment }) => {
  return (
    <div>
      <strong>{comment.body}</strong>
      <br />
      Author: {comment.author} <br />
      Vote score: {comment.voteScore} <br />
    </div>
  );
};

export default Comment;
