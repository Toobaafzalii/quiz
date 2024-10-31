import { useDispatch, useSelector } from "react-redux";
import { deleteMovie, setMovies } from "./reducer";
import { useEffect } from "react";

export const Table: React.FC = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies); // Access movies directly
  const sortState = useSelector((state) => state.sorting);

  useEffect(() => {
    const storedMovies = localStorage.getItem("movies");
    if (storedMovies) {
      const parsedMovies = JSON.parse(storedMovies);
      dispatch(setMovies(parsedMovies));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("movies", JSON.stringify(movies));
  }, [movies]);

  const sortedMovies =
    movies?.length > 0
      ? movies.sort((a: IMovie, b: IMovie) => {
          if (sortState.sortBy === "name") {
            return sortState.sortOrder === "asc"
              ? a.name.localeCompare(b.name)
              : b.name.localeCompare(a.name);
          } else if (sortState.sortBy === "rating") {
            return sortState.sortOrder === "asc"
              ? a.rating - b.rating
              : b.rating - a.rating;
          }
          return 0;
        })
      : [];

  const handleSortByName = () => {
    dispatch({ type: "SORT_BY_NAME" });
  };

  const handleSortByRating = () => {
    dispatch({ type: "SORT_BY_RATING" });
  };

  return (
    <div className="w-full flex flex-col justify-between items-center gap-2 px-16">
      <div className="w-full flex justify-between items-center bg-sky-950 text-gray-300 text-xl font-bold py-2 px-16 rounded-xl">
        <div className="px-16 py-2 border-x-2 border-gray-300">Movie Name</div>
        <div className="px-16 py-2 border-x-2 border-gray-300">Genre</div>
        <div className="px-16 py-2 border-x-2 border-gray-300">Rating</div>
        <div className="px-16 py-2 border-x-2 border-gray-300">Action</div>
      </div>
      {sortedMovies.length > 0 &&
        sortedMovies.map((movie: IMovie) => (
          <div
            key={movie.id}
            className="w-full flex justify-between items-center bg-gray-800 text-gray-300 text-xl font-bold py-2 pl-32 pr-10 rounded-xl"
          >
            <div className="px-16 py-2 text-center " onClick={handleSortByName}>
              {movie.name}
            </div>
            <div className="px-16 py-2 text-center ">{movie.genre}</div>
            <div
              className="px-16 py-2 text-center "
              onClick={handleSortByRating}
            >
              {movie.rating}
            </div>
            <div className="px-16 py-2 text-center space-x-4 ">
              <button className="bg-gray-500 text-gray-300 text-lg font-bold border-2 border-gray-300 rounded-md py-1.5 px-3 hover:shadow-2xl hover:bg-gray-400">
                Edit
              </button>
              <button
                className="bg-gray-500 text-gray-300 text-lg font-bold border-2 border-gray-300 rounded-md py-1.5 px-3 hover:shadow-2xl hover:bg-gray-400"
                onClick={() => dispatch(deleteMovie(movie.id))}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};
