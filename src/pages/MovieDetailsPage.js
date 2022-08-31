import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { apiKey, fetcher } from "../config";
// 3ce49afbabd14f11e4b7097cf42c2ab9
// https://api.themoviedb.org/3/movie/{movie_id}?api_key=3ce49afbabd14f11e4b7097cf42c2ab9&language=en-US
const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const { data, error } = useSWR(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`,
    fetcher
  );
  if (!data) return null;
  const { overview, backdrop_path, poster_path, title, genres } = data;
  console.log("log ~ MovieDetailsPage ~ data", data);
  return (
    <>
      <div
        className="relative w-full h-screen mb-10 text-white bg-no-repeat bg-cover "
        style={{
          backgroundImage: `url(https:image.tmdb.org/t/p/original${backdrop_path})`,
        }}
      >
        <div className="absolute inset-0 h-full overlay bg-gradient-to-t from-black to-transparent"></div>
      </div>
      <div className="w-full h-[400px] max-w-[800px] mx-auto -mt-[200px] z-10 relative">
        <img
          src={`https:image.tmdb.org/t/p/original${poster_path}`}
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
    </>
  );
};

function MovieCredits() {
  const { movieId } = useParams();
  const { data, error } = useSWR(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`,
    fetcher
  );
  //https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key=3ce49afbabd14f11e4b7097cf42c2ab9
  const { cast } = data;
  if (!data) return null;

  return (
    <div className="text-white">
      <h1 className="text-center text-white font-medium text-[36px] mb-10">
        Credits
      </h1>
      <div className="grid grid-cols-4 gap-5 px-10">
        {cast.length > 0 &&
          cast.slice(0, 8).map((item) => (
            <div className="cast-item">
              <img
                src={`https:image.tmdb.org/t/p/original${item.profile_path}`}
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

export default MovieDetailsPage;
