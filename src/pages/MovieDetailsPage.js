import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { apiKey, fetcher } from "../config";
// 3ce49afbabd14f11e4b7097cf42c2ab9
// https://api.themoviedb.org/3/movie/{movie_id}?api_key=3ce49afbabd14f11e4b7097cf42c2ab9&language=en-US
const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const { data, error } = useSWR(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`,
    fetcher
  );
  console.log("log ~ MovieDetailsPage ~ data", data);
  return <div>MovieDetailPage</div>;
};

export default MovieDetailsPage;
