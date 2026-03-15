// list of apis
export const API_URL = "https://api.themoviedb.org/3";
export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";

export const APIS = {
  trending: "/trending/movie/day",
  movieDetails: (id: number | string) => `/movie/${id}`,
  movieCredits: (id: number | string) => `/movie/${id}/credits`,
  movieVideos: (id: number | string) => `/movie/${id}/videos`,
  search: "/search/movie",
  genres: "/genre/movie/list",
  nowPlaying: "/movie/now_playing",
  topRated: "/movie/top_rated",
  upcoming: "/movie/upcoming",
};
