import React, { useEffect, useState } from "react";
import useSWR from "swr";
// import useSWRInfinite from "swr/infinite";
import ReactPaginate from "react-paginate";
import MovieCard from "components/movie/MovieCard";
import { fetcher, tmdbAPI } from "config";
import useDebounce from "hooks/useDebounce";
const itemsPerPage = 20;

const MoviePage = () => {
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);
  const [nextPage, setNextPage] = useState(1);
  const [query, setQuery] = useState("");
  const [url, setUrl] = useState(tmdbAPI.getMovieList("popular", nextPage));
  const { debounceValue } = useDebounce(query, 1500);
  const handleQueryChange = (e) => {
    // const newQuery = e.target.value;
    // setQuery(newQuery);
    // setSearchParams({
    //   query: newQuery,
    // });
    setQuery(e.target.value);
  };

  useEffect(() => {
    if (debounceValue) {
      setUrl(tmdbAPI.getMovieSearch(debounceValue, nextPage));
    } else {
      setUrl(tmdbAPI.getMovieList("popular", nextPage));
    }
  }, [debounceValue, nextPage]);
  const { data, error } = useSWR(url, fetcher);
  const loading = !data && !error;
  const movies = data?.results || [];
  useEffect(() => {
    if (!data || !data.total_results) return;

    // Fetch items from another resources.
    setPageCount(Math.ceil(data.total_results / itemsPerPage));
  }, [data, itemOffset]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.total_results;
    setItemOffset(newOffset);
    setNextPage(event.selected + 1);
  };

  return (
    <div className="py-10 text-white page-container">
      <div className="flex mb-10">
        <div className="flex-1">
          <input
            type="text"
            className="w-full p-4 bg-slate-800 outline-none text-white font-medium text-[20px]"
            placeholder="Search your movies..."
            value={query}
            onChange={handleQueryChange}
          />
        </div>
        <button className="p-4 border-none rounded-lg bg-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
      {loading && (
        <div className="mx-auto mt-20 rounded-full border-[5px] border-t-[5px] w-14 h-14 border-primary animate-spin border-t-transparent"></div>
      )}
      <div className="grid grid-cols-2 gap-10 lg:grid-cols-4">
        {movies.length > 0 &&
          movies.map((item) => (
            <MovieCard key={item.id} item={item}></MovieCard>
          ))}
      </div>
      <div className="mt-10">
        <ReactPaginate
          breakLabel="..."
          nextLabel={`${window.innerWidth < 1024 ? ">" : "Trang sau >"}`}
          previousLabel={`${window.innerWidth < 1024 ? "<" : "< Trang trước "}`}
          onPageChange={handlePageClick}
          pageRangeDisplayed={window.innerWidth < 1024 ? 2 : 6}
          pageCount={pageCount}
          renderOnZeroPageCount={null}
          className="pagination"
        />
      </div>
    </div>
  );
};

export default MoviePage;
