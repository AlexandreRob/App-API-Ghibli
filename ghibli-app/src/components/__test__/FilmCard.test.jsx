import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import FilmCard from "../FilmCard";

// Mock du store Zustand
vi.mock("../../store/store", () => {
  return {
    default: (selector) =>
      selector({
        favorites: [],
        toggleFavorite: vi.fn(),
      }),
  };
});

// Données de test
const mockFilm = {
  id: "1",
  title: "Castle in the Sky",
  director: "Hayao Miyazaki",
  release_date: "1986",
  image: "https://example.com/image.jpg",
  rt_score: "95",
};

// Helper pour render avec router
const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};
describe("FilmCard", () => {
  it("should render film information correctly", () => {
    renderWithRouter(<FilmCard film={mockFilm} />);
    expect(screen.getByText("Castle in the Sky")).toBeInTheDocument();
    expect(screen.getByText("Hayao Miyazaki")).toBeInTheDocument();
    expect(screen.getByText("1986")).toBeInTheDocument();
    expect(screen.getByAltText("Castle in the Sky")).toBeInTheDocument();
  });
  it('should render the "Voir plus" link with correct href', () => {
    renderWithRouter(<FilmCard film={mockFilm} />);
    const link = screen.getByRole("link", { name: /voir plus/i });
    expect(link).toHaveAttribute("href", "/film/1");
  });
  it("should display favorite button", () => {
    renderWithRouter(<FilmCard film={mockFilm} />);
    const favoriteButton = screen.getByRole("button");
    expect(favoriteButton).toBeInTheDocument();
  });
});
