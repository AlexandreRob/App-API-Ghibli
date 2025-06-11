import { create } from "zustand";
import { persist } from "zustand/middleware";

const useStore = create()(
  persist(
    (set, get) => ({
      films: [],
      allFilms: [], // Garder tous les films
      favorites: [],

      // Actions pour mettre à jour les films
      updateFilms: (newFilms) => set({ films: newFilms }),
      updateAllFilms: (newFilms) =>
        set({ allFilms: newFilms, films: newFilms }),

      // Action pour filtrer les films par recherche
      filterFilms: (searchTerm) => {
        const { allFilms } = get();
        if (searchTerm === "") {
          set({ films: allFilms });
        } else {
          const filtered = allFilms.filter((film) =>
            film.title.toLowerCase().includes(searchTerm.toLowerCase())
          );
          set({ films: filtered });
        }
      },

      // Actions pour gérer les favoris
      updateFavorites: (newFavorites) => set({ favorites: newFavorites }),

      toggleFavorite: (filmId) =>
        set((state) => {
          if (state.favorites.includes(filmId)) {
            return {
              favorites: state.favorites.filter((id) => id !== filmId),
            };
          }
          return {
            favorites: [...state.favorites, filmId],
          };
        }),
    }),
    {
      name: "film-storage",
    }
  )
);
export default useStore;
