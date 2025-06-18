import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import FilmDetailPage from "../../Pages/FilmDetailPage";

// Mock du store Zustand
vi.mock("../../store/store", () => {
  const mockFilms = [
    {
      id: "1",
      title: "Castle in the Sky",
      director: "Hayao Miyazaki",
      release_date: "1986",
      image: "https://example.com/image.jpg",
      rt_score: "95",
      description: "A young girl with a mysterious crystal...",
    },
  ];
  const mockStore = {
    films: mockFilms,
    favorites: [],
    toggleFavorite: vi.fn(),
  };
  return {
    default: vi.fn((selector) => selector(mockStore)),
  };
});
// Mock dynamique de useParams
let mockId = "1";
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useParams: () => ({ id: mockId }),
  };
});
const renderWithRouter = (routeId = "1") => {
  mockId = routeId;
  return render(
    <MemoryRouter initialEntries={[`/film/${routeId}`]}>
      <FilmDetailPage />
    </MemoryRouter>
  );
};
describe("FilmDetailPage", () => {
  it("should render film details when film exists", () => {
    renderWithRouter("1");
    expect(screen.getByText("Castle in the Sky")).toBeInTheDocument();
    expect(screen.getByText("Hayao Miyazaki")).toBeInTheDocument();
    expect(screen.getByText("1986")).toBeInTheDocument();
    expect(screen.getByText("95/100")).toBeInTheDocument();
    expect(
      screen.getByText("A young girl with a mysterious crystal...")
    ).toBeInTheDocument();
  });
  it("should show loading when film does not exist", () => {
    renderWithRouter("999");
    expect(screen.getByText("Chargement...")).toBeInTheDocument();
  });
});
