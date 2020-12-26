import React, { useEffect, useState } from "react";
import "../styles/MovieRanker.css";

const MovieRanker = () => {
  document.title = "The Shoppies";
  const [searchTerm, setSearchTerm] = useState("");
  const [foundMovies, setFoundMovies] = useState([]);
  const [nominatedMovies, setNominatedMovies] = useState([]);
  const [completed, setCompleted] = useState(false);

  const checkNominatedMoviesSize = () => {
    setCompleted(nominatedMovies.length >= 5);
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
      setFoundMovies(moviesTitleYear);
    } else {
      setFoundMovies([]);
    }
  };

  useEffect(() => {
    searchMovies();
  }, [searchTerm]);

  useEffect(() => {
    checkNominatedMoviesSize();
  }, [nominatedMovies]);

  return (
    <div className="container">
      <h1 className="main-title">The Shoppies</h1>
      <p className="main-para">
        Select 5 movies as Nominees. <strong>You</strong> decide.
      </p>
      <div className="grid-container">
        <div className="search-container">
          <div className="search-bar">
            <div className="icon magnifier"></div>
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
          <div className="icon film"></div>
          <h2 className="subtitle">Results for "{searchTerm}"</h2>
          <ul className="foundMovies-list">
            {foundMovies.map((foundMovie) => (
              <li className="foundMovies-list-item">
                <div className="foundMovies-list-label">{foundMovie}</div>
                <button
                  className="foundMovies-list-button"
                  onClick={nominateMovie}
                  value={foundMovie}
                  disabled={nominatedMovies.includes(foundMovie) || completed}
                >
                  Nominate
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="nominatedMovies-container">
          <div className="icon trophy"></div>
          <h2 className="subtitle">Nominations</h2>
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
        <div
          className={
            completed
              ? "banner-container banner-container-show"
              : "banner-container"
          }
        >
          <p className="banner-text">
            Congratulations! You've completed your selection
          </p>
        </div>
      </div>
    </div>
  );
};
export default MovieRanker;
