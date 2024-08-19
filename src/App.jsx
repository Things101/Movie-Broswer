import { useState, useEffect } from 'react';
import './App.css';
import SearchIcon from "./search.svg";
import Movie from "./Movie.jsx";
import useLocalStorage from './useLocalStorage.jsx';

const API_URL =  "http://www.omdbapi.com?apikey=ddda45c"

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("Harry Potter");
  const [count, setCount] = useState(1);
  const [background, setBackground] = useLocalStorage("background", "dark");
  
  useEffect(() => {
    searchMovies("Harry Potter");
  }, []);

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}&page=${count}`);
    const data = await response.json();
    setMovies(data.Search);
  } 

  const toggleTheme = () => {
    setBackground(background === "light" ? "dark" : "light"); 
  }

  return (
    <div className="app" data-theme={background}>
      <h1>Movie Browser</h1>
      <button className="backgroundTheme" onClick={toggleTheme}>Toggle Background Theme</button>
      <div className="search">
        <input 
          placeholder="Search for movies" 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter"){
              searchMovies(searchTerm);
            };
            setCount(1);
          }}
        />
        <img 
          src={SearchIcon} 
          alt="Search" 
          onClick={() => {
            searchMovies(searchTerm);
            setCount(1);
          }}
        />
      </div>

      {movies?.length > 0 
        ? (
          <div className="container">
            {movies.map((movie) => (
              <Movie movie={movie}/>
            ))}
          </div>
        ) : (
          <div className="empty">
            <h2>{searchTerm === "" ? "Search for a movie" : "No movies found"}</h2>
          </div>
        )}
      
      <div className="pageButtons">
        <button onClick={() => {
          if(count > 1){
            setCount((prevCount) => prevCount-1);
          }
          searchMovies(searchTerm);
          }}>Previous</button>

        <p>Current page: {count}</p>

        <button onClick={() => {
          setCount((prevCount) => prevCount+1);
          searchMovies(searchTerm);
        }}>Next</button>

        
      </div>
    </div>
  );
}

export default App;
