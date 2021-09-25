import axios from "axios";
import React, { useEffect, useState, useCallback, useRef } from "react";
import { Button, Container, Grid, Input, MovieCard } from "../components";

function Home() {
  const initialData = {
    loading: true,
    Response: null,
    Search: [],
    totalResults: 0,
    totalItems: 0,
    nextPage: 1,
    totalShowing: 5,
  };
  const [data, setData] = useState(initialData);
  const searchData = async (newKeyword = false) => {
    try {
      const res = await axios.get(
        `http://www.omdbapi.com?apikey=${"c119f187"}&s=${
          formData.keyword ? formData.keyword : "Batman"
        }&page=${data.nextPage}`
      );
      if (newKeyword) {
        setData((prev) => ({
          ...prev,
          Response: res.data.Response,
          Search: res.data.Search,
          loading: false,
          totalItems: res.data.Search.length,
          totalResults: res.data.totalResults,
          nextPage: 1,
          totalShowing: 5,
        }));
      } else {
        let prevSearchData = data.Search;
        if (res.data.Search) {
          prevSearchData.push(...res.data.Search);
        }
        setData((prev) => ({
          ...prev,
          Response: res.data.Response,
          Search: prevSearchData,
          loading: false,
          totalItems: prevSearchData.length,
          totalResults: res.data.totalResults,
          nextPage: prev.nextPage + 1,
        }));
      }
    } catch (error) {
      console.log(error);
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
          setData((prev) => ({
            ...prev,
            totalShowing: prev.totalShowing + 5,
          }));
          if (data.totalShowing === data.totalItems) {
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
          Cari Film yang Membuat Harimu Menyenangkan!
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
      </header>
      <section className="movie-list">
        <Grid colMobile={2} colDesktop={5}>
          {data.Search.map((props, index) => {
            if (index < data.totalShowing)
              return (
                <MovieCard
                  key={index}
                  {...props}
                  lastMovieRef={
                    index + 1 === data.totalShowing ? contentRef : null
                  }
                />
              );
          })}
        </Grid>
      </section>
    </Container>
  );
}

export default Home;
