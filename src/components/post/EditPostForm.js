import React from "react";

const EditPostForm = ({ details, onSubmit, onChange, onClick }) => {
  return (
    <form onSubmit={onSubmit}>
      <input value={details.title} name="title" onChange={onChange} />
      <br />
      <input value={details.body} name="body" onChange={onChange} />
      <br />
      <button>Save</button>
      <button onClick={onClick}>Cancel</button>
    </form>
  );
};

export default EditPostForm;
