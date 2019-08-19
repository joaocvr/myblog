import React from "react";

const UserActions = ({ voteAction, deleteAction, editAction }) => {
  return (
    <div>
      <button onClick={() => voteAction("upVote")}>Up vote</button>
      <button onClick={() => voteAction("downVote")}>Down vote</button>
      <button onClick={editAction}>Edit</button>
      <button onClick={deleteAction}>Delete</button>
    </div>
  );
};

export default UserActions;
