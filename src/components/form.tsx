import { FormInput } from "./input";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addMovie } from "./reducer";

export const Form: React.FC = () => {
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name.trim() === "" || name.trim() === "") {
      alert("Please enter a valid movie name and genre.");
      return;
    }
    dispatch(addMovie({ id: Date.now(), name, genre, rating }));
    console.log(genre, name, rating);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex justify-center items-center gap-10 bg-sky-950 rounded-xl border-2 border-gray-300 py-10 px-20 shadow-2xl"
    >
      <FormInput
        type="text"
        lable="Movie Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <FormInput
        type="text"
        lable="Genre"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
      />
      <FormInput
        type="number"
        lable="Rating"
        value={rating}
        min={0}
        max={10}
        onChange={(e) => setRating(Number(e.target.value))}
      />
      <button
        className="bg-gray-500 text-gray-300 text-lg font-bold border-2 border-gray-300 rounded-md py-1.5 px-3 hover:shadow-2xl hover:bg-gray-400"
        type="submit"
      >
        ADD
      </button>
    </form>
  );
};
