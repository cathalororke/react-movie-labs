import React, { useState, useEffect } from "react";  
import MovieList from "../components/movieList";
import Grid from "@mui/material/Grid2";
import Header from '../components/headerMovieList';
import FilterCard from "../components/filterMoviesCard";

const HomePage = (props) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&include_adult=false&page=2`
    )
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        return json.results;
      })
      .then((movies) => {
        setMovies(movies);
      });
  }, []);

  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");

  const genreId = Number(genreFilter);

  let displayedMovies = movies
    .filter((m) => {
      return m.title.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
    })
    .filter((m) => {
      return genreId > 0 ? m.genre_ids.includes(genreId) : true;
    });

  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
    else setGenreFilter(value);
  };

  return (
    <Grid container>
      <Grid size={12}>
        <Header title={"Home Page"} />
      </Grid>
      <Grid container sx={{flex: "1 1 500px"}}>
        <Grid key="find" size={{xs: 12, sm: 6, md: 4, lg: 3, xl: 2}} sx={{padding: "20px"}}>
        <FilterCard
         onUserInput={handleChange}
         titleFilter={nameFilter}
         genreFilter={genreFilter}
        />
        </Grid>
        <MovieList movies={displayedMovies} />
      </Grid>
    </Grid>
  );
};
export default HomePage;