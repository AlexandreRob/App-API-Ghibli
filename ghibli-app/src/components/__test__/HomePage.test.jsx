import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import HomePage from "../../Pages/HomePage";

// Mock du store Zustand
vi.mock("../../store/store", () => {
  return {
    default: (selector) =>
      selector({
        films: [
          {
            id: "1",
            title: "Castle in the Sky",
            director: "Hayao Miyazaki",
            release_date: "1986",
            image: "https://example.com/image.jpg",
          },
        ],
        favorites: [],
        toggleFavorite: vi.fn(),
      }),
  };
});
const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};
describe("HomePage", () => {
  it("should render FilmList component", () => {
    renderWithRouter(<HomePage />);
    expect(screen.getByText("Castle in the Sky")).toBeInTheDocument();
  });
});
