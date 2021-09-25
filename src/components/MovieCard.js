import React from "react";
import PropTypes from "prop-types";
import "./Components.css";

function MovieCard(props) {
  return (
    <div className="movie-card" ref={props.lastMovieRef}>
      <div className="poster">
        <img src={props.Poster} />
      </div>
      <div className="meta-info">
        <h3>{props.Title}</h3>
      </div>
    </div>
  );
}
MovieCard.propTypes = {
  children: PropTypes.node,
  Poster: PropTypes.string,
  Title: PropTypes.string,
  Type: PropTypes.string,
  Year: PropTypes.string,
  imdbID: PropTypes.string,
  lastMovieRef: PropTypes.object,
};
export default MovieCard;
