import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import FilmList from "../FilmList";

// Mock du store
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
            image: "https://example.com/image1.jpg",
          },
          {
            id: "2",
            title: "My Neighbor Totoro",
            director: "Hayao Miyazaki",
            release_date: "1988",
            image: "https://example.com/image2.jpg",
          },
        ],
        favorites: [],
      }),
  };
});

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("FilmList", () => {
  it("should render all films when not on favorite page", () => {
    renderWithRouter(<FilmList isFavoritePage={false} />);
    expect(screen.getByText("Castle in the Sky")).toBeInTheDocument();
    expect(screen.getByText("My Neighbor Totoro")).toBeInTheDocument();
  });
  it('should show "no favorites" message when favorite page is empty', () => {
    renderWithRouter(<FilmList isFavoritePage={true} />);
    expect(
      screen.getByText("Aucun film en favori pour le moment.")
    ).toBeInTheDocument();
  });
});
