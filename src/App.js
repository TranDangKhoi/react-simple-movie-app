import "./App.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/bundle";
import Banner from "./components/banner/Banner";
import MovieList from "./components/movie/MovieList";

function App() {
  return (
    <>
      <header className="flex items-center justify-center py-10 mb-5 text-white header gap-x-5">
        <span className="text-primary">Home</span>
        <span>Movies</span>
      </header>
      <Banner></Banner>
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
