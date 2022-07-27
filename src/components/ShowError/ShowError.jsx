import React from "react";

import './style.scss';

const ShowError = ({ errorMessage }) => {
  return (<>
    <p className="error-red">{errorMessage}</p>
  </>)
}

export default ShowError;