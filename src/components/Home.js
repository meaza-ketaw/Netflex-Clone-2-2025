import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css"; 
import { FaSearch, FaBell, FaShoppingCart, FaPlay, FaInfoCircle, FaBars } from 'react-icons/fa'; // Import icons
import logo from "../assets/images/Netflix_Logo_RGB.png"; 

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [topMovie, setTopMovie] = useState(null);
  const [error, setError] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const API_KEY = "c3067e3348ea1c5c8da87c451493cdde"; 

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
        );
        setMovies(response.data.results);
        if (response.data.results.length > 0) {
          setTopMovie(response.data.results[0]); // Set the top movie
          }
      } catch (error) {
        setError("Error fetching movies. Please try again later.");
        console.error("Error fetching movies:", error.message);
      }
    };
    fetchMovies();
  }, [API_KEY]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="home">
      <nav className="w3-bar w3-black">
        <img src={logo} alt="Netflix Logo" className="logo" />

        <div className={`nav-links ${menuOpen ? "active" : ""}`}>
          <a href="#" className="w3-bar-item w3-button">
            Home
          </a>
          <a href="#" className="w3-bar-item w3-button">
            TV Shows
          </a>
          <a href="#" className="w3-bar-item w3-button">
            Movies
          </a>
          <a href="#" className="w3-bar-item w3-button">
            News & Popular
          </a>
          <a href="#" className="w3-bar-item w3-button">
            My List
          </a>
          <a href="#" className="w3-bar-item w3-button">
            Browse by Languages
          </a>
        </div>
        <div className="nav-icons">
          <FaSearch className="nav-icon" />
          <FaBell className="nav-icon" />
          <FaShoppingCart className="nav-icon" />
          <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            <FaBars />
          </div>
        </div>
      </nav>

      {/* Top Movie Description */}
      {topMovie && (
        <div className="top-movie-description">
          <h2>
            <strong>{topMovie.title}</strong>
          </h2>
          <p>{topMovie.overview}</p>
        </div>
      )}

      {/* Buttons Section */}
      <div className="button-section">
        <button className="play-button">
          <FaPlay /> Play
        </button>
        <button className="info-button">
          <FaInfoCircle /> More Information
        </button>
      </div>

      <h2>Popular Movies</h2>
      <div className="movie-list">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <a href={`/movie/${movie.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="movie-image"
              />
              <h3>{movie.title}</h3>
              <p>${movie.vote_average}</p>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
