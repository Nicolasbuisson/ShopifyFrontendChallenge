import React, { Component } from "react";
import "../styles/MovieRanker.css";

export class MovieRanker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      foundMovies: ["Rambo", "Bambi", "Mulan"],
      nominatedMovies: ["Pirates of the Carribean", "Shrek"],
    };

    //functions
    this.checkNominatedMoviesSize = this.checkNominatedMoviesSize.bind(this);
    this.updateSearchTerm = this.updateSearchTerm.bind(this);
    this.removeNomination = this.removeNomination.bind(this);
    this.nominateMovie = this.nominateMovie.bind(this);
    this.searchMovies = this.searchMovies.bind(this);
  }

  checkNominatedMoviesSize() {
    if (this.state.nominatedMovies.length >= 5) {
      alert("Movie Nomination Complete");
    }
    /*this works
    do a "Banner"
    not sure what this means, a pop-up?
    a div at the bottom that appears to say it's complete?*/
  }

  updateSearchTerm(event) {
    this.setState({ searchTerm: event.target.value });
  }

  removeNomination(event) {
    let index = this.state.nominatedMovies.indexOf(event.target.value);
    this.state.nominatedMovies.splice(index, 1);
    this.setState({ nominatedMovies: this.state.nominatedMovies });
  }

  nominateMovie(event) {
    let newNominatedMovies = [
      ...this.state.nominatedMovies,
      event.target.value,
    ];
    this.setState({ nominatedMovies: newNominatedMovies });
  }

  searchMovies() {
    //perform API call
  }

  render() {
    //this.checkNominatedMoviesSize();
    //this.searchMovies()
    return (
      <div className="container">
        <h1 className="main-title">The Shoppies</h1>
        <p className="main-para">
          Choose 5 movies for awards. <strong>You</strong> decide.
        </p>
        <div className="grid-container">
          <div className="search-container">
            <h2 className="search-subtitle">Movie title</h2>
            <div className="search-bar">
              {/* add search icon */}
              <input
                className="search-bar-input"
                type="text"
                value={this.state.searchTerm}
                onChange={this.updateSearchTerm}
              ></input>
            </div>
          </div>

          <div className="foundMovies-container">
            <h2 className="subtitle">Results for "{this.state.searchTerm}"</h2>
            {/** add movie/film icon */}
            <ul className="foundMovies-list">
              {this.state.foundMovies.map(
                //change this part when u add in Backend call
                (foundMovie) => (
                  // console.log(foundMovie),
                  <li className="foundMovies-list-item">
                    <div className="foundMovies-list-label">{foundMovie}</div>
                    <button
                      className="foundMovies-list-button"
                      onClick={this.nominateMovie}
                      value={foundMovie}
                      disabled={this.state.nominatedMovies.includes(foundMovie)}
                    >
                      Nominate
                    </button>
                  </li>
                )
              )}
            </ul>
          </div>

          <div className="nominatedMovies-container">
            <h2 className="subtitle">Nominations</h2>
            {/**add trophy/medal icon, gold color */}
            <ul className="nominatedMovies-list">
              {this.state.nominatedMovies.map(
                //change this part when u add in Backend call
                (nominatedMovie) => (
                  // console.log(nominatedMovie),
                  <li className="nominatedMovies-list-item">
                    <div className="nominatedMovies-list-label">
                      {nominatedMovie}
                    </div>
                    <button
                      className="nominatedMovies-list-button"
                      onClick={this.removeNomination}
                      value={nominatedMovie}
                    >
                      Remove
                    </button>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
export default MovieRanker;
