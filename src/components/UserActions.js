import React from "react";

const UserActions = ({ id, voter, deleter }) => {
  return (
    <div>
      <button
        onClick={_ => {
          voter("upVote", id);
        }}
      >
        Up vote
      </button>
      <button
        onClick={_ => {
          voter("downVote", id);
        }}
      >
        Down vote
      </button>
      <button onClick={_ => console.log()}>Edit</button>
      <button onClick={_ => deleter(id)}>Delete</button>
    </div>
  );
};

export default UserActions;
