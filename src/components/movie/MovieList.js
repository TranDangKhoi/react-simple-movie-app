import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode } from "swiper";

import useSWR from "swr";
import MovieCard from "./MovieCard";
import { fetcher, tmdbAPI } from "../../config";

const MovieList = ({ type = "now_playing" }) => {
  // const [movies, setMovies] = useState([]);
  const { data } = useSWR(tmdbAPI.getMovieList(type), fetcher);
  const movies = data?.results || [];
  // useEffect(() => {
  //   if (data && data.results) setMovies(data.results);
  // }, [data]);
  return (
    <div className="movie-list">
      <Swiper
        freeMode={true}
        navigation={true}
        grabCursor={true}
        slidesPerView={"auto"}
        spaceBetween={40}
        modules={[FreeMode, Navigation]}
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
