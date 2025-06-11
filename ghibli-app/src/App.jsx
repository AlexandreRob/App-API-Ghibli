import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import FilmDetailPage from "./Pages/FilmDetailPage";
import FavoritePage from "./Pages/FavoritePage";
import Header from "./components/Header";
import useStore from "./store/store";

function App() {
  const [search, setSearch] = useState("");
  const [sortMethod, setSortMethod] = useState("");
  // Zustand
  const updateAllFilms = useStore((state) => state.updateAllFilms);
  const updateFilms = useStore((state) => state.updateFilms);
  const filterFilms = useStore((state) => state.filterFilms);
  const films = useStore((state) => state.films);
  const allFilms = useStore((state) => state.allFilms);

  // Fonction pour récupérer les films
  const getFilms = async () => {
    const request = await fetch("https://ghibliapi.vercel.app/films");
    const data = await request.json();
    updateAllFilms(data);
  };

  // Charger les films au démarrage
  useEffect(() => {
    if (!allFilms.length) getFilms();
  }, [allFilms.length]);

  // Gestion de la recherche
  useEffect(() => {
    filterFilms(search);
  }, [search, filterFilms]);

  // Gestion du tri
  useEffect(() => {
    if (sortMethod !== "") {
      const sortedFilms = [...films].sort((film1, film2) => {
        if (sortMethod === "date") {
          return film1.release_date - film2.release_date;
        } else if (sortMethod === "title") {
          return film1.title.localeCompare(film2.title);
        } else if (sortMethod === "score") {
          return film2.rt_score - film1.rt_score;
        }
        return 0;
      });
      updateFilms(sortedFilms);
    }
  }, [sortMethod, updateFilms]);
  return (
    <BrowserRouter>
      <Navbar />
      <Header setSearch={setSearch} setSortMethod={setSortMethod} />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/film/:id" element={<FilmDetailPage />} />
          <Route path="/favorites" element={<FavoritePage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
export default App;
