import React from "react";
import MovieList from "../components/movie/MovieList";

const Homepage = () => {
  return (
    <>
      <section className="pb-10 movies-layout page-container">
        <h2 className="mb-5 text-3xl font-bold text-white capitalize">
          Now playing
        </h2>
        <MovieList type={"now_playing"} page={true}></MovieList>
      </section>
      <section className="pb-10 movies-layout page-container">
        <h2 className="mb-5 text-3xl font-bold text-white capitalize">
          Trending now
        </h2>
        <MovieList type={"popular"} page={true}></MovieList>
      </section>
      <section className="pb-10 movies-layout page-container">
        <h2 className="mb-5 text-3xl font-bold text-white capitalize">
          Top rated
        </h2>
        <MovieList type={"top_rated"} page={true}></MovieList>
      </section>
    </>
  );
};

export default Homepage;
