import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
import axios from "../axios";
import "./Row.css";
import movieTrailer from "movie-trailer";
const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    //fetch all the
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }

    fetchData();
  }, [fetchUrl]);
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };
  const movieClicked = (moviename) => {
    console.log(moviename);
    if (trailerUrl !== "") {
      setTrailerUrl("");
    } else {
      movieTrailer(moviename)
        .then((url) => {
          const urlParamV = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParamV.get("v"));
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div className="row">
      {/*title */}
      <h2>{title}</h2>
      <div className="row__posters">
        {/*several row posters*/}
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() =>
              movieClicked(movie.name || movie.title || movie.orginal_name)
            }
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      {trailerUrl !== "" && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
