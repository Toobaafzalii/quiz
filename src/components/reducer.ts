import { configureStore } from "@reduxjs/toolkit";

const initialState: IAppState = {
  movies: [],
  sorting: {
    sortBy: "name",
    sortOrder: "asc",
  },
};

const reducer = (state = initialState, action: any): IAppState => {
  switch (action.type) {
    case "ADD":
      return {
        ...state,
        movies: [...state.movies, action.payload],
      };
    case "DELETE":
      return {
        ...state,
        movies: state.movies.filter(
          (movie: IMovie) => movie.id !== action.payload
        ),
      };
    case "EDIT":
      return {
        ...state,
        movies: state.movies.map((movie: IMovie) =>
          movie.id === action.payload.id ? action.payload : movie
        ),
      };
    case "SORT":
      const { sortBy, sortOrder } = action.payload;
      const sortedMovies = [...state.movies].sort((a, b) => {
        if (sortBy === "name") {
          return sortOrder === "asc"
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        } else if (sortBy === "rating") {
          return sortOrder === "asc"
            ? a.rating - b.rating
            : b.rating - a.rating;
        }
        return 0;
      });
      return {
        ...state,
        sorting: {
          sortBy,
          sortOrder,
        },
        movies: sortedMovies,
      };
    case "SET_MOVIES":
      return {
        ...state,
        movies: action.payload,
      };
    default:
      return state;
  }
};

const appReducer = configureStore({
  reducer,
});

export default appReducer;

export const addMovie = (movie: IMovie) => ({
  type: "ADD",
  payload: movie,
});

export const deleteMovie = (id: number) => ({
  type: "DELETE",
  payload: id,
});

export const editMovie = (movie: IMovie) => ({
  type: "EDIT",
  payload: movie,
});

export const setSorting = (sorting: ISortingState) => ({
  type: "SORT",
  payload: sorting,
});

export const setMovies = (movies: IMovie[]) => ({
  type: "SET_MOVIES",
  payload: movies,
});
