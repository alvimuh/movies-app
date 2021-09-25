import React from "react";
import PropTypes from "prop-types";
import "./Components.css";

function Container(props) {
  return <div className="container">{props.children}</div>;
}
Container.propTypes = {
  children: PropTypes.node,
};
export default Container;
