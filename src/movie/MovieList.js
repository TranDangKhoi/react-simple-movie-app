import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { fetcher } from "../config";
import useSWR from "swr";
import MovieCard from "./MovieCard";

const MovieList = ({ type = "now_playing" }) => {
  const [movies, setMovies] = useState([]);
  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/${type}?api_key=3ce49afbabd14f11e4b7097cf42c2ab9&language=en-US&page=1`,
    fetcher
  );
  useEffect(() => {
    if (data && data.results) setMovies(data.results);
  }, [data]);
  return (
    <div className="movie-list">
      <Swiper
        grabCursor={true}
        slidesPerView={"4"}
        freeMode={true}
        spaceBetween={40}
      >
        {movies.length > 0 &&
          movies.map((item) => (
            <SwiperSlide key={item.id}>
              <MovieCard item={item}></MovieCard>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default MovieList;
