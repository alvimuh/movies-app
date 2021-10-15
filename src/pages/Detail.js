import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container } from "../components";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

function Detail() {
  const { id } = useParams();

  const [data, setData] = useState({
    error: false,
    loading: true,
    detail: null,
  });
  const getData = async () => {
    try {
      const res = await axios.get(
        `https://www.omdbapi.com?apikey=faf7e5bb&i=${id}`
      );
      setData((prev) => ({
        ...prev,
        detail: res.data,
        loading: false,
      }));
    } catch (error) {
      setData((prev) => ({
        ...prev,
        error: true,
        loading: false,
      }));
    }
  };
  useEffect(() => {
    getData();
  }, []);
  if (data.loading) {
    return <Container>Loading...</Container>;
  }
  return (
    <Container>
      <div className="movie-detail">
        <Link to="/" className="back">
          Kembali
        </Link>
        <img className="poster" src={data.detail.Poster} />
        <div>
          <h1>{data.detail.Title}</h1>
          <table>
            <tbody>
              <tr>
                <th>Actors</th>
                <td>:</td>
                <td>{data.detail.Actors}</td>
              </tr>
              <tr>
                <th>Writer</th>
                <td>:</td>
                <td>{data.detail.Writer}</td>
              </tr>
              <tr>
                <th>Director</th>
                <td>:</td>
                <td>{data.detail.Director}</td>
              </tr>
              <tr>
                <th>Production</th>
                <td>:</td>
                <td>{data.detail.Production}</td>
              </tr>
              <tr>
                <th>Year</th>
                <td>:</td>
                <td>{data.detail.Year}</td>
              </tr>
              <tr>
                <th>Production</th>
                <td>:</td>
                <td>{data.detail.Production}</td>
              </tr>
              <tr>
                <th>Genre</th>
                <td>:</td>
                <td>{data.detail.Genre}</td>
              </tr>
              <tr>
                <th>Plot</th>
                <td>:</td>
                <td>{data.detail.Plot}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Container>
  );
}

export default Detail;
