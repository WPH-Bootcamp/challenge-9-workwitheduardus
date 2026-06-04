import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Movie, FavoriteMovie, WatchlistMovie, MovieStoreState } from '@/types/movie';
import { STORAGE_KEYS } from '@/lib/constants';

// TODO: Define your store state interface
interface Movie {
  // State
  favorites: FavoriteMovie[];
  watchlist: WatchlistMovie[];
  // Favorite
  addFavorite: (movie: Movie) => void;
  removeFavorite: (movieId: number) => void;
  isFavorite: (movieId: number) => boolean;
  clearFavorites: () => void;
  // Watchlist
  addToWatchlist: (movie: Movie) => void;
  removeFromWatchlist: (movieId: number) => void;
  isInWatchlist: (movieId: number) => boolean;
  clearWatchlist: () => void;
}

// Zustand Store
export const useMovieStore = create<MovieStoreState>()(
  persist(
    (set, get) => ({
      // Initial
      favorites: [],
      watchlist: [],

      // Favorite
      addFavorite: (movie: Movie) => {
        // Guard: prevent duplicates
        if (get().isFavorite(movie.id)) return;
        const item: FavoriteMovie = { ...movie, added_at: Date.now() };
        set((state) => ({
          favorites: [item, ...state.favorites],
        }));
      },

      removeFavorite: (movieId: number) => {
        set((state) => ({
          favorites: state.favorites.filter((m) => m.id !== movieId),
        }));
      },

      isFavorite: (movieId: number) => {
        return get().favorites.some((m) => m.id === movieId);
      },

      clearFavorites: () => set({ favorites: [] }),

      // Watchlist
      addToWatchlist: (movie: Movie) => {
        // Guard: prevent duplicates
        if (get().isInWatchlist(movie.id)) return;

        const item: WatchlistMovie = { ...movie, added_at: Date.now() };
        set((state) => ({
          watchlist: [item, ...state.watchlist],
        }));
      },

      removeFromWatchlist: (movieId: number) => {
        set((state) => ({
          watchlist: state.watchlist.filter((m) => m.id !== movieId),
        }));
      },

      isInWatchlist: (movieId: number) => {
        return get().watchlist.some((m) => m.id === movieId);
      },

      clearWatchlist: () => set({ watchlist: [] }),
    }),
    {
      // localStorage key
      name: STORAGE_KEYS.favorites,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        favorites: state.favorites,
        watchlist: state.watchlist,
      }),
    }
  )
);

// Favorite
export const useFavorites = () => useMovieStore((s) => s.favorites);
export const useFavoriteCount = () => useMovieStore((s) => s.favorites.length);
export const useIsFavorite = (id: number) => useMovieStore((s) => s.isFavorite(id));
export const useAddFavorite = () => useMovieStore((s) => s.addFavorite);
export const useRemoveFavorite = () => useMovieStore((s) => s.removeFavorite);

// Watchlist
export const useWatchlist = () => useMovieStore((s) => s.watchlist);
export const useWatchlistCount = () => useMovieStore((s) => s.watchlist.length);
export const useIsInWatchlist = (id: number) => useMovieStore((s) => s.isInWatchlist(id));
export const useAddToWatchlist = () => useMovieStore((s) => s.addToWatchlist);
export const useRemoveFromWatchlist = () => useMovieStore((s) => s.removeFromWatchlist);
