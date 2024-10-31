import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMovies, deleteMovie, setSorting } from "./reducer";

export const Table: React.FC = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state: IMovieList) => state.movies);
  const [initialLoad, setInitialLoad] = useState(true);
  const { sortBy, sortOrder } = useSelector(
    (state: IAppState) => state.sorting
  );

  const handleSort = (field: "name" | "rating") => {
    dispatch(
      setSorting({
        sortBy: field,
        sortOrder: sortOrder === "asc" ? "desc" : "asc",
      })
    );
  };

  useEffect(() => {
    const storedMovies = localStorage.getItem("movies");
    if (storedMovies && initialLoad) {
      const parsedMovies = JSON.parse(storedMovies);
      dispatch(setMovies(parsedMovies));
      setInitialLoad(false);
    }
  }, [dispatch, initialLoad]);

  const saveMoviesToLocalStorage = () => {
    localStorage.setItem("movies", JSON.stringify(movies));
  };

  useEffect(() => {
    if (!initialLoad) {
      saveMoviesToLocalStorage();
    }
  }, [movies, initialLoad]);
  return (
    <div className="w-full flex flex-col justify-between items-center gap-2 px-16">
      <div className="w-full flex justify-between items-center bg-sky-950 text-gray-300 text-xl font-bold py-2 px-16 rounded-xl">
        <div
          className="px-16 py-2 border-x-2 border-gray-300"
          onClick={() => handleSort("name")}
        >
          Movie Name
        </div>
        <div className="px-16 py-2 border-x-2 border-gray-300">Genre</div>
        <div
          className="px-16 py-2 border-x-2 border-gray-300"
          onClick={() => handleSort("rating")}
        >
          Rating
        </div>
        <div className="px-16 py-2 border-x-2 border-gray-300">Action</div>
      </div>
      {movies.length > 0 &&
        movies.map((movie: IMovie) => (
          <div
            key={movie.id}
            className="w-full flex justify-between items-center bg-gray-800 text-gray-300 text-xl font-bold py-2 pl-32 pr-10 rounded-xl"
          >
            <div className="px-16 py-2 text-center ">{movie.name}</div>
            <div className="px-16 py-2 text-center ">{movie.genre}</div>
            <div className="px-16 py-2 text-center ">{movie.rating}</div>
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
