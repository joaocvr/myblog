import React from "react";
import { postVote } from "../api/API";

const UserActions = ({ postId }) => {
  return (
    <div>
      <button
        onClick={_ => postVote("upVote", postId).then(r => console.log(r))}
      >
        +
      </button>
      <button onClick={_ => console.log()}>-</button>
      <button onClick={_ => console.log()}>Edit</button>
      <button onClick={_ => console.log()}>Delete</button>
    </div>
  );
};

export default UserActions;
