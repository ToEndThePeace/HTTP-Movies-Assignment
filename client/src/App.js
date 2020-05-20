import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import axios from "axios";
import MovieForm from "./Movies/MovieForm";

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then((res) => setMovieList(res.data))
      .catch((err) => console.log(err.response));
  };

  const addToSavedList = (movie) => {
    setSavedList([...savedList, movie]);
  };

  const updateMovies = (updatedMovie) => {
    setMovieList([
      ...movieList.filter((x) => x.id !== updatedMovie.id),
      updatedMovie,
    ]);
  };

  const removeMovie = (id) => {
    setMovieList(movieList.filter((x) => x.id !== id));
  };

  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <>
      <SavedList list={savedList} />

      <Route exact path="/">
        <MovieList movies={movieList} />
      </Route>

      <Route path="/movies/:id">
        <Movie addToSavedList={addToSavedList} removeMovie={removeMovie} />
      </Route>

      <Route path="/update-movie/:id">
        <MovieForm updateMovies={updateMovies} />
      </Route>
    </>
  );
};

export default App;
