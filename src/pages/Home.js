import axios from "axios";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import React, { useEffect, useState, useCallback, useRef } from "react";
import { Button, Container, Grid, Input, MovieCard } from "../components";

function Home(props) {
  const searchData = async (newKeyword = false) => {
    try {
      const res = await axios.get(
        `https://www.omdbapi.com?apikey=faf7e5bb&s=${
          formData.keyword ? formData.keyword : "Batman"
        }&page=${props.nextPage}`
      );

      let prevSearchData = newKeyword ? [] : props.Search;
      if (res.data.Search) {
        prevSearchData.push(...res.data.Search);
      }
      props.setMovies({
        Response: res.data.Response,
        Search: prevSearchData,
        loading: false,
        totalItems: prevSearchData.length,
        totalResults: res.data.totalResults,
        nextPage: newKeyword ? 1 : props.nextPage + 1,
        totalShowing: newKeyword ? 5 : props.totalShowing,
      });
    } catch (error) {
      props.setError();
    }
  };
  useEffect(() => {
    searchData();
  }, []);

  const [y, setY] = useState(window.scrollY);

  const handleScroll = useCallback(
    (e) => {
      const window = e.currentTarget;
      //check if target ref on the last movie card
      if (contentRef.current) {
        if (
          y < window.scrollY && // check if user scrolling down
          y + contentRef.current.offsetHeight >
            contentRef.current?.getBoundingClientRect().top + window.scrollY //check if target in viewport
        ) {
          props.setMovies({
            totalShowing: props.totalShowing + 5,
          });
          if (props.totalShowing === props.totalItems) {
            searchData();
          }
        }
      }
      setY(window.scrollY);
    },
    [y]
  );

  const contentRef = useRef(null);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const [formData, setFormData] = useState({
    keyword: "",
  });
  const formChangeHandler = (event) => {
    setFormData({ [event.target.name]: event.target.value });
  };
  return (
    <Container>
      <header className="header">
        <h1 className="headline">
          Temukan Film yang Membuat Harimu Menyenangkan!
        </h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            searchData(true);
          }}
        >
          <Input
            name="keyword"
            placeholder="Cari judul film..."
            value={formData.keyword}
            onChange={formChangeHandler}
          />
          <Button>Cari</Button>
        </form>
        {props.totalResults > 0 ? (
          <p className="headline-desc">Ditemukan {props.totalResults} film</p>
        ) : (
          <p className="headline-desc">Tidak ada film pada keyword tersebut</p>
        )}
      </header>
      <section className="movie-list">
        <Grid colMobile={2} colDesktop={5}>
          {props.Search.map((data, index) => {
            if (index < props.totalShowing) {
              return (
                <MovieCard
                  key={index}
                  {...data}
                  lastMovieRef={
                    index + 1 === props.totalShowing ? contentRef : null
                  }
                />
              );
            }
          })}
        </Grid>
      </section>
    </Container>
  );
}
Home.propTypes = {
  setMovies: PropTypes.func,
  setError: PropTypes.func,
  loading: PropTypes.bool,
  Response: PropTypes.string,
  Search: PropTypes.array,
  totalResults: PropTypes.string,
  totalItems: PropTypes.number,
  nextPage: PropTypes.number,
  totalShowing: PropTypes.number,
};
const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    Response: state.Response,
    Search: state.Search,
    totalResults: state.totalResults,
    totalItems: state.totalItems,
    nextPage: state.nextPage,
    totalShowing: state.totalShowing,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setMovies: (action) => dispatch({ type: "SET_MOVIES", ...action }),
    setError: () => dispatch({ type: "SET_ERROR" }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
