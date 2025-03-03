import React, { useState } from "react";

const API_KEY = "ecdbe17c"; // OMDB API Key
const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}&s=`;

const App = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  const searchMovies = async () => {
    if (!query) return;
    try {
      const response = await fetch(`${API_URL}${query}`);
      const data = await response.json();
      if (data.Response === "True") {
        setMovies(data.Search);
        setError(null);
      } else {
        setMovies([]);
        setError(data.Error);
      }
    } catch (err) {
      setError("Something went wrong!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold mb-6">IMDb Clone</h1>
      <div className="flex space-x-2 mb-6">
        <input
          type="text"
          placeholder="Search for a movie..."
          className="p-2 rounded-lg text-black w-64"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={searchMovies} className="p-2 bg-yellow-500 text-black rounded-lg">Search</button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {movies.map((movie) => (
          <div key={movie.imdbID} className="border border-gray-700 p-4 rounded-lg">
            <img src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/150"} 
                 alt={movie.Title} 
                 className="w-full h-64 object-cover rounded-md" />
            <h2 className="text-lg font-semibold mt-2">{movie.Title}</h2>
            <p className="text-gray-400">{movie.Year}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
