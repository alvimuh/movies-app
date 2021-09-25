import React from "react";
import PropTypes from "prop-types";
import "./Components.css";

function Input(props) {
  return <input className="form" {...props} />;
}
Input.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
};
export default Input;
