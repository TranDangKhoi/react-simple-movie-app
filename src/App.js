import "./App.css";
import { NavLink } from "react-router-dom";

function App() {
  return (
    <>
      <header className="header mb-5 flex py-10 text-white items-center justify-center gap-x-5">
        <span className="text-primary">Home</span>
        <span>Movies</span>
      </header>
      <section className="banner h-[500px] page-container mb-20">
        <div className="w-full h-full rounded-lg relative">
          <div className="overlay absolute inset-0 bg-gradient-to-t from-black to-transparent rounded-lg"></div>
          <img
            src="http://genk.mediacdn.vn/2019/8/20/1-15662898065871774855253.jpg"
            alt=""
            className="w-full h-full object-cover rounded-lg"
          />
          <div className="absolute text-white left-5 bottom-5 w-full">
            <h2 className="font-bold text-3xl mb-5">Avengers: Endgame</h2>
            <div className="flex items-center mb-8 gap-x-3">
              <span className="py-2 px-4 border border-white rounded-md">
                Action
              </span>
              <span className="py-2 px-4 border border-white rounded-md">
                Adventure
              </span>
              <span className="py-2 px-4 border border-white rounded-md">
                Comedy
              </span>
            </div>
            <button className="py-3 px-6 rounded-lg bg-primary text-white font-medium">
              Watch Now
            </button>
          </div>
        </div>
      </section>
      <section className="movies-layout page-container pb-10">
        <h2 className="capitalize text-white mb-5 text-3xl font-bold">
          Now playing
        </h2>
        <div className="movie-list grid grid-cols-4 gap-10">
          <div className="movie-card text-white rounded-lg p-3 bg-slate-800">
            <img
              src="http://genk.mediacdn.vn/2019/8/20/1-15662898065871774855253.jpg"
              alt=""
              className="w-full h-[250px] object-cover rounded-lg mb-5"
            />
            <h3 className="text-white text-lg font-bold mb-3">
              Spiderman: Homecoming
            </h3>
            <div className="flex items-center justify-between opacity-50 mb-10">
              <span>2017</span>
              <span>7.4</span>
            </div>
            <button className="py-3 px-6 rounded-lg capitalize bg-primary">
              Watch now
            </button>
          </div>
        </div>
      </section>
      <section className="movies-layout page-container pb-10">
        <h2 className="capitalize text-white mb-5 text-3xl font-bold">
          Trending now
        </h2>
        <div className="movie-list grid grid-cols-4 gap-10">
          <div className="movie-card text-white rounded-lg p-3 bg-slate-800">
            <img
              src="http://genk.mediacdn.vn/2019/8/20/1-15662898065871774855253.jpg"
              alt=""
              className="w-full h-[250px] object-cover rounded-lg mb-5"
            />
            <h3 className="text-white text-lg font-bold mb-3">
              Spiderman: Homecoming
            </h3>
            <div className="flex items-center justify-between opacity-50 mb-10">
              <span>2017</span>
              <span>7.4</span>
            </div>
            <button className="py-3 px-6 rounded-lg capitalize bg-primary">
              Watch now
            </button>
          </div>
        </div>
      </section>
      <section className="movies-layout page-container pb-10">
        <h2 className="capitalize text-white mb-5 text-3xl font-bold">
          Top rated
        </h2>
        <div className="movie-list grid grid-cols-4 gap-10">
          <div className="movie-card text-white rounded-lg p-3 bg-slate-800">
            <img
              src="http://genk.mediacdn.vn/2019/8/20/1-15662898065871774855253.jpg"
              alt=""
              className="w-full h-[250px] object-cover rounded-lg mb-5"
            />
            <h3 className="text-white text-lg font-bold mb-3">
              Spiderman: Homecoming
            </h3>
            <div className="flex items-center justify-between opacity-50 mb-10">
              <span>2017</span>
              <span>7.4</span>
            </div>
            <button className="py-3 px-6 rounded-lg capitalize bg-primary">
              Watch now
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
