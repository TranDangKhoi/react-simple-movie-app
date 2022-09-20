import React from "react";
import { useParams } from "react-router-dom";
import { FreeMode, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import useSWR from "swr";
import MovieCard from "../components/movie/MovieCard";
import { apiKey, fetcher, tmdbAPI } from "../config";
// 3ce49afbabd14f11e4b7097cf42c2ab9
// https://api.themoviedb.org/3/movie/{movie_id}?api_key=3ce49afbabd14f11e4b7097cf42c2ab9&language=en-US
const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const { data, error } = useSWR(tmdbAPI.getMovieDetails(movieId), fetcher);
  if (!data) return null;
  const { overview, backdrop_path, poster_path, title, genres } = data;
  return (
    <>
      <div
        className="relative w-full h-screen mb-10 text-white bg-no-repeat bg-cover "
        style={{
          backgroundImage: `url(${tmdbAPI.imageOriginal(backdrop_path)})`,
        }}
      >
        <div className="absolute inset-0 h-full overlay bg-gradient-to-t from-black to-transparent"></div>
      </div>
      <div className="w-full h-[400px] max-w-[800px] mx-auto -mt-[200px] z-10 relative">
        <img
          src={tmdbAPI.imageOriginal(poster_path)}
          alt=""
          className="object-cover w-full h-full mx-auto rounded-xl"
        />
      </div>
      <h1 className="text-center mt-10 text-[52px] text-white">{title}</h1>
      {genres.length > 0 && (
        <div className="flex items-center justify-center mb-10 gap-x-5">
          {genres.map((item) => (
            <span
              className="text-white text-[15px] border-2 border-primary rounded-lg py-2 px-4 flex items-center justify-center"
              key={item.id}
            >
              {item.name}
            </span>
          ))}
        </div>
      )}
      <p className="text-[19px] mb-10 text-center leading-loose max-w-[700px] mx-auto text-white">
        {overview}
      </p>
      <MovieCredits></MovieCredits>
      <MovieVideos></MovieVideos>
      <MoviesSimilar></MoviesSimilar>
    </>
  );
};

function MovieCredits() {
  const { movieId } = useParams();
  const { data } = useSWR(tmdbAPI.getMovieMeta("credits", movieId), fetcher);
  //https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key=3ce49afbabd14f11e4b7097cf42c2ab9
  // console.log("log ~ MovieCredits ~ data", data);
  if (!data) return null;
  const { cast } = data;
  if (!cast || cast.length < 0) return;
  return (
    <div className="text-white">
      <h1 className="text-center text-white font-medium text-[36px] mb-10">
        Credits
      </h1>
      <div className="grid grid-cols-4 gap-5 px-10">
        {cast.length > 0 &&
          cast.slice(0, 8).map((item) => (
            <div key={item.id} className="cast-item">
              <img
                src={tmdbAPI.imageOriginal(item.profile_path)}
                alt=""
                className="w-full h-[350px] object-cover rounded-lg mb-5"
              />
              <h3 className="text-xl font-medium text-center">{item.name}</h3>
            </div>
          ))}
      </div>
    </div>
  );
}

function MovieVideos() {
  const { movieId } = useParams();
  const { data } = useSWR(tmdbAPI.getMovieMeta("videos", movieId), fetcher);
  if (!data || !data.results) return null;
  const { results } = data;
  if (!results || results.length < 0) return null;
  return (
    <>
      <h1 className="text-center text-white font-medium text-[36px] mb-10">
        Teaser & Trailers
      </h1>
      <div className="grid items-center grid-cols-3 gap-10 text-white justify-items-center">
        {results.slice(0, 6).map((item) => (
          <div key={item.id} className="mb-10">
            <iframe
              width="557"
              height="370"
              src={`https://www.youtube.com/embed/${item.key}`}
              title={item.name}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ))}
      </div>
    </>
  );
}

function MoviesSimilar() {
  const { movieId } = useParams();
  const { data } = useSWR(tmdbAPI.getMovieMeta("similar", movieId), fetcher);
  if (!data || !data.results) return null;
  const { results } = data;
  if (!results || results.length < 0) return null;
  return (
    <div className="py-10 mx-auto text-center text-white">
      <h2 className="mb-10 text-3xl font-medium">Similar Movies</h2>
      <div className="movie-list">
        <Swiper
          freeMode={true}
          navigation={true}
          grabCursor={true}
          slidesPerView={"auto"}
          spaceBetween={40}
          modules={[FreeMode, Navigation]}
        >
          {results.length > 0 &&
            results.map((item) => (
              <SwiperSlide key={item.id}>
                <MovieCard item={item}></MovieCard>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
}
export default MovieDetailsPage;
