import React from "react";

const BackButton = ({ history }) => {
  return <button onClick={_ => history && history.goBack()}>Back</button>;
};

export default BackButton;
