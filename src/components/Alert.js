import React from "react";

const Alert = (props) => {
  return (
    props.alert && <div className={`alert alert-${props.alert.type}`} role="alert">
      <strong>{props.alert.type==='success'?'Success':'Error'}</strong>: {props.alert.message}
    </div>
  );
};

export default Alert;
