import React, { useEffect, useState } from "react";
import axios from "axios";

const MovieDetails = ({ match }) => {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      const response = await axios.get(
        `https://api.example.com/movies/${match.params.id}`
      ); // Replace with real API
      setMovie(response.data);
    };
    fetchMovie();
  }, [match.params.id]);

  if (!movie) return <p>Loading...</p>;

  return (
    <div>
      <h2>{movie.title}</h2>
      <img src={movie.poster} alt={movie.title} />
      <p>{movie.description}</p>
    </div>
  );
};

export default MovieDetails;
