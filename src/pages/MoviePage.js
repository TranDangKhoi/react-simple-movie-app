import React, { useEffect, useState } from "react";
import useSWR from "swr";
import MovieCard from "../components/movie/MovieCard";
import { fetcher } from "../config";
import useDebounce from "../hooks/useDebounce";
// https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>&language=en-US&query=spiderman&page=1&include_adult=false
const MoviePage = ({ type = "popular" }) => {
  const [query, setQuery] = useState("");
  const [url, setUrl] = useState(
    `https://api.themoviedb.org/3/movie/${type}?api_key=3ce49afbabd14f11e4b7097cf42c2ab9&language=en-US&page=1`
  );
  const { debounceValue } = useDebounce(query, 1500);
  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };
  useEffect(() => {
    if (debounceValue) {
      setUrl(
        `https://api.themoviedb.org/3/search/movie?api_key=3ce49afbabd14f11e4b7097cf42c2ab9&language=en-US&query=${debounceValue}&page=1`
      );
    } else {
      setUrl(
        `https://api.themoviedb.org/3/movie/popular?api_key=3ce49afbabd14f11e4b7097cf42c2ab9&language=en-US&page=1`
      );
    }
  }, [debounceValue]);
  console.log(debounceValue);
  const { data, error } = useSWR(url, fetcher);
  const loading = !data && !error;
  const movies = data?.results || [];
  return (
    <div className="py-10 page-container">
      <div className="flex mb-10">
        <div className="flex-1">
          <input
            type="text"
            className="w-full p-4 bg-slate-800 outline-none text-white font-medium text-[20px]"
            placeholder="Search your movies..."
            onChange={handleQueryChange}
          />
        </div>
        <button className="p-4 border-none rounded-lg bg-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
      {loading && (
        <div className="mx-auto mt-20 rounded-full border-[5px] border-t-[5px] w-14 h-14 border-primary animate-spin border-t-transparent"></div>
      )}
      <div className="grid grid-cols-4 gap-10">
        {movies.length > 0 &&
          movies.map((item) => (
            <MovieCard key={item.id} item={item}></MovieCard>
          ))}
      </div>
    </div>
  );
};

export default MoviePage;
