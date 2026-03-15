import { apiClient } from "./apiClient";
import { APIS } from "./apis";
import { Movie, MovieDetails, CreditsResponse, TMDBResponse, VideoResponse } from "../types/movie";

export const movieService = {
  getTrendingMovies: async (page: number = 1): Promise<TMDBResponse<Movie>> => {
    return apiClient<TMDBResponse<Movie>>(APIS.trending, { page });
  },

  getMovieDetails: async (id: number | string): Promise<MovieDetails> => {
    return apiClient<MovieDetails>(APIS.movieDetails(id));
  },

  getMovieCredits: async (id: number | string): Promise<CreditsResponse> => {
    return apiClient<CreditsResponse>(APIS.movieCredits(id));
  },

  getMovieVideos: async (id: number | string): Promise<VideoResponse> => {
    return apiClient<VideoResponse>(APIS.movieVideos(id));
  },

  searchMovies: async (query: string, page: number = 1): Promise<TMDBResponse<Movie>> => {
    return apiClient<TMDBResponse<Movie>>(APIS.search, { query, page });
  },

  getNowPlaying: async (page: number = 1): Promise<TMDBResponse<Movie>> => {
    return apiClient<TMDBResponse<Movie>>(APIS.nowPlaying, { page });
  },

  getTopRated: async (page: number = 1): Promise<TMDBResponse<Movie>> => {
    return apiClient<TMDBResponse<Movie>>(APIS.topRated, { page });
  },

  getUpcoming: async (page: number = 1): Promise<TMDBResponse<Movie>> => {
    return apiClient<TMDBResponse<Movie>>(APIS.upcoming, { page });
  },
};
