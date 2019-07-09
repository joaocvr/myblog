import React from "react";

const UserActions = ({ id, voteAction, deleteAction }) => {
  return (
    <div>
      <button onClick={() => voteAction("upVote", id)}>Up vote</button>
      <button onClick={() => voteAction("downVote", id)}>Down vote</button>
      <button onClick={() => console.log()}>Edit</button>
      <button onClick={() => deleteAction(id)}>Delete</button>
    </div>
  );
};

export default UserActions;
