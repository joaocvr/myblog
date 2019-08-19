import React from "react";
import UserActions from "../utils/UserActions";

const PostData = ({ details, voteAction, editAction, deleteAction }) => {
  return (
    <div>
      <h1>{details.title}</h1>
      <h3>{details.body}</h3>
      <UserActions
        voteAction={voteAction}
        editAction={editAction}
        deleteAction={deleteAction}
      />
    </div>
  );
};

export default PostData;
