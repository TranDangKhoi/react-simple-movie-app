# Khoi's React Simple Movie App

### `Still working on the project`

Live website: [Khoi's Movie App](https://trandangkhoi.github.io/react-simple-movie-app/)

To run the project:

- Clone or fork
- Go to terminal type: `npm start`
- Enjoy!

# Những thứ đã học được sau khi làm project này

1. Cách xử lí khi có nhiều api giống nhau, ta sẽ tạo ra 1 file config api riêng, tạo object chứa các function để get ra api trong 1 file riêng nếu có quá nhiều components sử dụng các api khác nhau
   <br>

```js
export const apiKey = "3ce49afbabd14f11e4b7097cf42c2ab9";
const tmdbEndpoint = "https://api.themoviedb.org/3/movie";
const tmdbEndpointSearch = "https://api.themoviedb.org/3/search/movie";
export const tmdbAPI = {
  getMovieList: (type, page = 1) =>
    `${tmdbEndpoint}/${type}?api_key=${apiKey}&page=${page}`,
  getMovieSearch: (query, page) =>
    `${tmdbEndpointSearch}?api_key=3ce49afbabd14f11e4b7097cf42c2ab9&language=en-US&query=${query}&page=${page}`,
  getMovieDetails: (movieId) => `${tmdbEndpoint}/${movieId}?api_key=${apiKey}`,
  getMovieMeta: (type, movieId) =>
    `${tmdbEndpoint}/${movieId}/${type}?api_key=${apiKey}`,
  imageOriginal: (url) => `https://image.tmdb.org/t/p/original${url}`,
};
```

2. Cách sử dụng lazy và Suspense để chia ra thành nhiều chunk nhỏ khác nhau, để khi load web, web sẽ không phải load tất cả component một lúc, mà vào trang nào thì mới load tới đó nhưng vẫn giữ tính chất SPA
   <br>

3. Cách sử dụng SWR để get data từ api

4. Cách phân trang sử dụng react-paginate

5. Tìm hiểu về sự khác nhau giữa HashRouter và BrowserRouter

6. Prop-types và Error Boundaries
