import React from "react";

const UserActions = ({ id, voteFunction, update }) => {
  return (
    <div>
      <button
        onClick={_ => {
          voteFunction("upVote", id);
          update();
        }}
      >
        Up vote
      </button>
      <button
        onClick={_ => {
          voteFunction("downVote", id);
          update();
        }}
      >
        Down vote
      </button>
      <button onClick={_ => console.log()}>Edit</button>
      <button onClick={_ => console.log()}>Delete</button>
    </div>
  );
};

export default UserActions;
