import "./App.css";
import { NavLink } from "react-router-dom";
import "swiper/css";
import MovieList from "./movie/MovieList";

function App() {
  return (
    <>
      <header className="flex items-center justify-center py-10 mb-5 text-white header gap-x-5">
        <span className="text-primary">Home</span>
        <span>Movies</span>
      </header>
      <section className="banner h-[500px] page-container mb-20">
        <div className="relative w-full h-full rounded-lg">
          <div className="absolute inset-0 rounded-lg overlay bg-gradient-to-t from-black to-transparent"></div>
          <img
            src="http://genk.mediacdn.vn/2019/8/20/1-15662898065871774855253.jpg"
            alt=""
            className="object-cover w-full h-full rounded-lg"
          />
          <div className="absolute w-full text-white left-5 bottom-5">
            <h2 className="mb-5 text-3xl font-bold">Avengers: Endgame</h2>
            <div className="flex items-center mb-8 gap-x-3">
              <span className="px-4 py-2 border border-white rounded-md">
                Action
              </span>
              <span className="px-4 py-2 border border-white rounded-md">
                Adventure
              </span>
              <span className="px-4 py-2 border border-white rounded-md">
                Comedy
              </span>
            </div>
            <button className="px-6 py-3 font-medium text-white rounded-lg bg-primary">
              Watch Now
            </button>
          </div>
        </div>
      </section>
      <section className="pb-10 movies-layout page-container">
        <h2 className="mb-5 text-3xl font-bold text-white capitalize">
          Now playing
        </h2>
        <MovieList type={"now_playing"}></MovieList>
      </section>
      <section className="pb-10 movies-layout page-container">
        <h2 className="mb-5 text-3xl font-bold text-white capitalize">
          Trending now
        </h2>
        <MovieList type={"popular"}></MovieList>
      </section>
      <section className="pb-10 movies-layout page-container">
        <h2 className="mb-5 text-3xl font-bold text-white capitalize">
          Top rated
        </h2>
        <MovieList type={"top_rated"}></MovieList>
      </section>
    </>
  );
}

export default App;
