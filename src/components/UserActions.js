import React from "react";

const UserActions = ({ voteAction, deleteAction }) => {
  return (
    <div>
      <button onClick={() => voteAction("upVote")}>Up vote</button>
      <button onClick={() => voteAction("downVote")}>Down vote</button>
      <button onClick={() => console.log()}>Edit</button>
      <button onClick={() => deleteAction()}>Delete</button>
    </div>
  );
};

export default UserActions;
