import AsyncStorage from '@react-native-async-storage/async-storage';
import { Movie } from '../types/movie';

const WATCHLIST_KEY = '@movie_app_watchlist';

export const storage = {
  getWatchlist: async (): Promise<Movie[]> => {
    try {
      const jsonValue = await AsyncStorage.getItem(WATCHLIST_KEY);
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
      console.error('Error reading watchlist:', e);
      return [];
    }
  },

  addToWatchlist: async (movie: Movie): Promise<void> => {
    try {
      const watchlist = await storage.getWatchlist();
      if (!watchlist.find((m) => m.id === movie.id)) {
        const newWatchlist = [...watchlist, movie];
        await AsyncStorage.setItem(WATCHLIST_KEY, JSON.stringify(newWatchlist));
      }
    } catch (e) {
      console.error('Error adding to watchlist:', e);
    }
  },

  removeFromWatchlist: async (movieId: number): Promise<void> => {
    try {
      const watchlist = await storage.getWatchlist();
      const newWatchlist = watchlist.filter((m) => m.id !== movieId);
      await AsyncStorage.setItem(WATCHLIST_KEY, JSON.stringify(newWatchlist));
    } catch (e) {
      console.error('Error removing from watchlist:', e);
    }
  },

  isInWatchlist: async (movieId: number): Promise<boolean> => {
    const watchlist = await storage.getWatchlist();
    return !!watchlist.find((m) => m.id === movieId);
  },
};
