import React, { useState, useEffect } from "react";
import YouTube from "react-youtube";
// @ts-ignore
import movieTrailer from "movie-trailer";
import { Movie } from "../utils/interface";
import axios from "../axios";
import "./Row.css";
//
const base_url: string = "https://image.tmdb.org/t/p/original/";
interface Props {
  title: string;
  fetchUrl: string;
  isLargeRow?: boolean;
}
interface Opts {
  height: string;
  width: string;
  playerVars: {
    autoplay: number;
  };
}
function Row({ title, fetchUrl, isLargeRow = false }: Props) {
  const [movies, setMovies] = useState<[]>([]);
  const [trailerUrl, setTrailerUrl] = useState<string | null>("");
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
    }
    fetchData();
  }, [fetchUrl]);
  const opts: Opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };
  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {/* several row posters */}

        {movies.map((movie: Movie) => {
          //   if (movie.backdrop_path === undefined) {
          //     console.log(title);
          //   }
          //   console.log(movie.backdrop_path);
          return (
            <img
              key={movie?.id}
              className={`row__poster ${isLargeRow && "row__posterLarge"} `}
              src={`${base_url}${
                isLargeRow ? movie?.poster_path : movie?.backdrop_path
              }`}
              alt={movie.name}
              onClick={() => {
                if (trailerUrl) {
                  setTrailerUrl("");
                } else {
                  //   setTrailerUrl("");
                  movieTrailer(movie?.name || "")
                    .then((url: string) => {
                      //   setTrailerUrl();
                      const urlParams = new URLSearchParams(
                        new URL(url).search
                      );
                      setTrailerUrl(urlParams.get("v"));
                    })
                    .catch((error: []) => console.log(error));
                }
              }}
            />
          );
        })}
      </div>
      {/* @ts-ignore */}
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
// function movieTrailer(arg0) {
//   throw new Error("Function not implemented.");
// }
