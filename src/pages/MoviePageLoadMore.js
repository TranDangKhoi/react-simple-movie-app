import React, { useEffect, useState } from "react";
import useSWRInfinite from "swr/infinite";
import Button from "../components/button/Button";
import MovieCard from "../components/movie/MovieCard";
import { fetcher, tmdbAPI } from "../config";
import useDebounce from "../hooks/useDebounce";
// import ReactPaginate from "react-paginate";
const itemsPerPage = 20;

const MoviePageLoadMore = () => {
  const [nextPage, setNextPage] = useState(1);
  const [query, setQuery] = useState("");
  const [url, setUrl] = useState(tmdbAPI.getMovieList("popular", nextPage));
  const { debounceValue } = useDebounce(query, 1500);
  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };
  useEffect(() => {
    if (debounceValue) {
      setUrl(tmdbAPI.getMovieSearch(debounceValue, nextPage));
    } else {
      setUrl(tmdbAPI.getMovieList("popular", nextPage));
    }
  }, [debounceValue, nextPage]);
  const { data, error, size, setSize } = useSWRInfinite(
    (index) => url.replace("page=1", `page=${index + 1}`),
    fetcher
  );
  const movies = data ? data.reduce((a, b) => a.concat(b.results), []) : [];
  // Giá trị ban đầu sẽ là 1 mảng rỗng sau đó a sẽ là mảng chứa thông tin của CÁC TRANG TRƯỚC
  // (tức là [] tại lúc bắt đầu là trang 1, đã có trang trước nào đâu), b sẽ là currentValue chứa thông tin của trang 1
  // Tức nghĩa là: nếu bạn đang ở trang 4 thì a sẽ là mảng chứa thông tin của trang 1 2 3, b sẽ là trang 4 hiện tại
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.results.length < itemsPerPage);
  const loading = !data && !error;
  return (
    <div className="py-10 text-white page-container">
      <div className="flex mb-10">
        <div className="flex-1">
          <input
            type="text"
            className="w-full p-4 bg-slate-800 outline-none text-white font-medium text-[20px]"
            placeholder="Search your movies..."
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
      <div className="grid grid-cols-4 gap-10">
        {movies.length > 0 &&
          movies.map((item) => (
            <MovieCard key={item.id} item={item}></MovieCard>
          ))}
      </div>
      {!isReachingEnd && (
        <div className="mt-10 text-center">
          <Button onClick={() => setSize(size + 1)} bgColor="secondary">
            Load more
          </Button>
        </div>
      )}
    </div>
  );
};

export default MoviePageLoadMore;
