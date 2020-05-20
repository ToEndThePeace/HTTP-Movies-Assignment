import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";

const initialMovie = {
  title: "",
  director: "",
  metascore: "",
  stars: [],
};

const MovieForm = (props) => {
  const [movie, setMovie] = useState(initialMovie);
  const { id: curId } = useParams();
  const { push } = useHistory();
  const { updateMovies } = props;

  const handleInput = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setMovie({
      ...movie,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${curId}`, movie)
      .then((res) => {
        updateMovies(res.data);
        push(`/movies/${res.data.id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${curId}`)
      .then((res) => {
        setMovie(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [curId]);
  return (
    <form className="MovieForm" onSubmit={handleSubmit}>
      <h1>Form</h1>
      <input
        type="text"
        name="title"
        placeholder="Movie title..."
        value={movie.title}
        onChange={handleInput}
      />
      <input
        type="text"
        name="director"
        placeholder="Director..."
        value={movie.director}
        onChange={handleInput}
      />
      <input
        type="text"
        name="metascore"
        placeholder="Metascore..."
        value={movie.metascore}
        onChange={handleInput}
      />
      <input type="submit" value="Submit" />
    </form>
  );
};

export default MovieForm;
