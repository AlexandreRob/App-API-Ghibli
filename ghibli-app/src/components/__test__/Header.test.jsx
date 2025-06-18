import { describe, it, expect, beforeEach, vi } from "vitest";
import useStore from "../../store/store";

// Mock de localStorage pour les tests
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

globalThis.localStorage = localStorageMock;

describe("Zustand Store", () => {
  let store;
  beforeEach(() => {
    // Réinitialiser le store avant chaque test
    store = useStore.getState();
    useStore.setState({
      films: [],
      allFilms: [],
      favorites: [],
    });
  });

  describe("Films management", () => {
    it("should update films", () => {
      const testFilms = [
        { id: "1", title: "Film 1" },
        { id: "2", title: "Film 2" },
      ];
      useStore.getState().updateFilms(testFilms);
      expect(useStore.getState().films).toEqual(testFilms);
    });
    it("should update all films and current films", () => {
      const testFilms = [
        { id: "1", title: "Film 1" },
        { id: "2", title: "Film 2" },
      ];
      useStore.getState().updateAllFilms(testFilms);
      expect(useStore.getState().allFilms).toEqual(testFilms);
      expect(useStore.getState().films).toEqual(testFilms);
    });
  });

  describe("Search functionality", () => {
    beforeEach(() => {
      const testFilms = [
        { id: "1", title: "Castle in the Sky" },
        { id: "2", title: "My Neighbor Totoro" },
        { id: "3", title: "Princess Mononoke" },
      ];
      useStore.getState().updateAllFilms(testFilms);
    });
    it("should filter films by search term", () => {
      useStore.getState().filterFilms("Castle");
      const filteredFilms = useStore.getState().films;
      expect(filteredFilms).toHaveLength(1);
      expect(filteredFilms[0].title).toBe("Castle in the Sky");
    });
    it("should return all films when search term is empty", () => {
      useStore.getState().filterFilms("");
      const films = useStore.getState().films;
      expect(films).toHaveLength(3);
    });
    it("should be case insensitive", () => {
      useStore.getState().filterFilms("totoro");
      const filteredFilms = useStore.getState().films;
      expect(filteredFilms).toHaveLength(1);
      expect(filteredFilms[0].title).toBe("My Neighbor Totoro");
    });
  });

  describe("Favorites management", () => {
    it("should add film to favorites", () => {
      useStore.getState().toggleFavorite("1");
      expect(useStore.getState().favorites).toContain("1");
    });
    it("should remove film from favorites", () => {
      // Ajouter d'abord
      useStore.getState().toggleFavorite("1");
      expect(useStore.getState().favorites).toContain("1");
      // Puis retirer
      useStore.getState().toggleFavorite("1");
      expect(useStore.getState().favorites).not.toContain("1");
    });
    it("should handle multiple favorites", () => {
      useStore.getState().toggleFavorite("1");
      useStore.getState().toggleFavorite("2");
      const favorites = useStore.getState().favorites;
      expect(favorites).toContain("1");
      expect(favorites).toContain("2");
      expect(favorites).toHaveLength(2);
    });
  });
});
