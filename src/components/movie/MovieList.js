import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode } from "swiper";

import useSWR from "swr";
import MovieCard from "./MovieCard";
import { fetcher } from "../../config";

const MovieList = ({ type = "now_playing" }, { page = true }) => {
  // const [movies, setMovies] = useState([]);
  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/${type}?api_key=3ce49afbabd14f11e4b7097cf42c2ab9&language=en-US&${
      page ? "page=1" : ""
    }`,
    fetcher
  );
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
