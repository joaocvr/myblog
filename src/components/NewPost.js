import React from "react";

const NewPost = ({ history }) => {
  return (
    <div>
      <h1>New Post</h1>
      <button onClick={() => history && history.goBack()}>Back</button>
    </div>
  );
};

export default NewPost;
