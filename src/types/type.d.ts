interface IInputProps {
  type: "text" | "number";
  lable: string;
  min?: number;
  max?: number;
  value: T;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface IMovie {
  id: number;
  name: string;
  genre: string;
  rating: number;
}

interface IMovieList {
  movies: IMovie[];
}

interface ISortingState {
  sortBy: "name" | "rating";
  sortOrder: "asc" | "desc";
}

interface ISortingState {
  sortBy: "name" | "rating";
  sortOrder: "asc" | "desc";
}
interface IAppState {
  movies: IMovie[];
  sorting: {
    sortBy: "name" | "rating";
    sortOrder: "asc" | "desc";
  };
}
