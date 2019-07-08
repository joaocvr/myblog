import React from "react";
import { withRouter } from "react-router-dom";

const BackButton = ({ history }) => {
  return <button onClick={_ => history && history.goBack()}>Back</button>;
};

export default withRouter(BackButton);
