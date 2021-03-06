import React, { useState, useEffect } from "react";
import axios from "../axios";
import requests from "../requests";
import "./Banner.css";
import { Movie } from "./../utils/interface";
function Banner() {
  const [movie, setMovie] = useState<Movie>({
    backdrop_path: "",
    name: "",
    overview: "",
    poster_path: "",
  });
  useEffect(() => {
    async function fetchData() {
      //
      const { data } = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        data.results[Math.floor(Math.random() * data.results.length - 1)]
      );
    }
    fetchData();
  }, []);
  console.log(movie);
  function turncate(str: string, n: number) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }
  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>
        <h1 className="banner__description">
          {turncate(movie?.overview, 150)}
        </h1>
      </div>
      {/* <div className="banner--fadeBottom" /> */}
    </header>
  );
}

export default Banner;
