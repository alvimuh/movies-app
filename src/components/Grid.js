import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import "./Components.css";

function Grid(props) {
  const [isMobile, setIsMobile] = useState(false);
  const handleResize = () => {
    if (window.innerWidth < 720) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
  });
  useEffect(() => {
    handleResize();
  });
  return (
    <div
      className="grid"
      style={{
        gridTemplateColumns: `repeat(${
          isMobile ? props.colMobile : props.colDesktop
        }, minmax(0, 1fr))`,
      }}
    >
      {props.children}
    </div>
  );
}
Grid.propTypes = {
  children: PropTypes.node,
  colMobile: PropTypes.number,
  colDesktop: PropTypes.number,
};
export default Grid;
