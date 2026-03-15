/**
 * Basic Movie Information (Used for lists like Trending, Popular, Search)
 */
export interface Movie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  adult: boolean;
  popularity: number;
  video: boolean;
}

/**
 * Detailed Movie Information (Used for the Movie Details screen)
 */
export interface MovieDetails extends Omit<Movie, 'genre_ids'> {
  genres: Genre[];
  runtime: number;
  tagline: string | null;
  status: string;
  budget: number;
  revenue: number;
  production_companies: ProductionCompany[];
  homepage: string | null;
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  name: string;
  logo_path: string | null;
  origin_country: string;
}

/**
 * Cast & Credits
 */
export interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
}

export interface CreditsResponse {
  id: number;
  cast: Cast[];
}

/**
 * Generic API Response Wrapper for lists
 */
export interface TMDBResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}
