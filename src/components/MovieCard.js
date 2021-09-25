import React from "react";
import PropTypes from "prop-types";
import "./Components.css";
import { Link } from "react-router-dom";

function MovieCard(props) {
  return (
    <div className="movie-card" ref={props.lastMovieRef}>
      <div className="poster">
        <img src={props.Poster} />
      </div>
      <div className="meta-info">
        <Link to={"/movie/" + props.imdbID}>
          <h3>{props.Title}</h3>
        </Link>
      </div>
    </div>
  );
}
MovieCard.propTypes = {
  Poster: PropTypes.string,
  Title: PropTypes.string,
  Type: PropTypes.string,
  Year: PropTypes.string,
  imdbID: PropTypes.string,
  lastMovieRef: PropTypes.object,
};
export default MovieCard;
