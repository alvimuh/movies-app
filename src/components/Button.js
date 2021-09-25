import React from "react";
import PropTypes from "prop-types";
import "./Components.css";

function Button(props) {
  return <button className="form" {...props} />;
}
Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
};
export default Button;
