import MovieList from "./MoviesList";
import Movie from "./Movie";
import { useEffect, useState } from "react";
import { getMovies } from "../../../data/repository";

// Movie related configurations
function Movies() {
  const [movieList, setMovieLists] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  async function loadMovies() {
    const currMovieList = await getMovies();
    console.log(currMovieList);
    if (currMovieList === null) {
      setMovieLists(MovieList);
      setIsLoading(false);
    } else {
      setMovieLists(currMovieList);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadMovies();
  }, []);

  return (
    <div className="container justify-content-center">
      <div className="row">
        {isLoading ? (
          <div>Loading Movies...</div>
        ) : movieList.length > 0 ? (
          movieList.map((movie) => (
            <Movie key={movie.movieID} movie={movie} loadMovies={loadMovies} />
          ))
        ) : (
          <div>No Movies are Shown</div>
        )}
      </div>
    </div>
  );
}

export default Movies;
