import React, { Component, useEffect, useState } from "react";
import "../styles/MovieRanker.css";

const MovieRanker = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [foundMovies, setFoundMovies] = useState(["Carribean", "Ursula"]);
  const [nominatedMovies, setNominatedMovies] = useState([
    "Pirates of the Carribean",
    "Shrek",
  ]);

  const checkNominatedMoviesSize = () => {
    if (nominatedMovies.length >= 5) {
      alert("Movie Nomination Complete");
    }
    /*this works
    do a "Banner"
    not sure what this means, a pop-up?
    a div at the bottom that appears to say it's complete?*/
  };

  const updateSearchTerm = (event) => {
    setSearchTerm(event.target.value);
  };

  const removeNomination = (event) => {
    let index = nominatedMovies.indexOf(event.target.value);
    nominatedMovies.splice(index, 1);
    let newNominatedMovies = [...nominatedMovies];
    setNominatedMovies(newNominatedMovies);
  };

  const nominateMovie = (event) => {
    let newNominatedMovies = [...nominatedMovies, event.target.value];
    setNominatedMovies(newNominatedMovies);
  };

  const searchMovies = async () => {
    let url =
      "http://www.omdbapi.com/?apikey=7409b0fc&type=movie&s=" + searchTerm;

    let response = await fetch(url);
    let responseJson = await response.json();

    console.log(responseJson.Search);
    let moviesTitleYear = [];
    if (responseJson.Search !== undefined) {
      for (let i = 0; i < responseJson.Search.length; i++) {
        if (i === 7) {
          break;
        }
        moviesTitleYear.push(
          responseJson.Search[i].Title +
            " (" +
            responseJson.Search[i].Year +
            ")"
        );
      }
      console.log(moviesTitleYear);
      setFoundMovies(moviesTitleYear);
    }
  };

  useEffect(() => {
    searchMovies();
  });

  return (
    <div className="container">
      <h1 className="main-title">The Shoppies</h1>
      <p className="main-para">
        Choose 5 movies for awards. <strong>You</strong> decide.
      </p>
      <div className="grid-container">
        <div className="search-container">
          <div className="search-bar">
            {/* add search icon */}
            <input
              className="search-bar-input"
              type="text"
              placeholder="Search by movie title"
              value={searchTerm}
              onChange={updateSearchTerm}
            ></input>
          </div>
        </div>

        <div className="foundMovies-container">
          <h2 className="subtitle">Results for "{searchTerm}"</h2>
          {/** add movie/film icon */}
          <ul className="foundMovies-list">
            {foundMovies.map((foundMovie) => (
              <li className="foundMovies-list-item">
                <div className="foundMovies-list-label">{foundMovie}</div>
                <button
                  className="foundMovies-list-button"
                  onClick={nominateMovie}
                  value={foundMovie}
                  disabled={nominatedMovies.includes(foundMovie)}
                >
                  Nominate
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="nominatedMovies-container">
          <h2 className="subtitle">Nominations</h2>
          {/**add trophy/medal icon, gold color */}
          <ul className="nominatedMovies-list">
            {nominatedMovies.map((nominatedMovie) => (
              <li className="nominatedMovies-list-item">
                <div className="nominatedMovies-list-label">
                  {nominatedMovie}
                </div>
                <button
                  className="nominatedMovies-list-button"
                  onClick={removeNomination}
                  value={nominatedMovie}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default MovieRanker;
